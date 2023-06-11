from collections import Counter

def magic(features):
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

__all__ = ['magic']
