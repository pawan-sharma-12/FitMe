import joblib
import numpy as np
from collections import Counter
import os

def magic(features, dict_of_word_embeddings, embedding_model, asana):
    predicted_asanas = []
    final_predicted_asanas = []
    
    for feature in features:
        if feature in dict_of_word_embeddings:
            input_array = np.expand_dims(dict_of_word_embeddings[feature], axis=0)
            prediction = embedding_model.predict(input_array)
            flatten_pred = prediction.flatten()
            result_indices = flatten_pred.argsort()[-10:][::-1]

            for result in result_indices:
                predicted_asanas.append(asana[result])

    counter_found = Counter(predicted_asanas)
    final_predicted_asanas_with_freq = counter_found.most_common(7)

    for yoga, freq in final_predicted_asanas_with_freq:
        final_predicted_asanas.append(yoga)

    return final_predicted_asanas


def main():
    dict_of_word_embeddings = joblib.load(r'D:\models\NitSgr Final Year 2023\DrYoga\server\Machine Learning\YogaPoseModel\word_embeddings.pkl')
    embedding_model = joblib.load(r'D:\models\NitSgr Final Year 2023\DrYoga\server\Machine Learning\YogaPoseModel\embedding_model.pkl')
    asana = joblib.load(r'D:\models\NitSgr Final Year 2023\DrYoga\server\Machine Learning\YogaPoseModel\asana.pkl')


    # Get the features from command-line arguments
    features = ['head','neck','hand','eye']

    # Call the magic function with the loaded variables
    result = magic(features, dict_of_word_embeddings, embedding_model, asana)

    # Print the result
    print(result)


if __name__ == '__main__':
    main()
