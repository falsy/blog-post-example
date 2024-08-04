from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# 모델 로드
model = load_model('cat_detector_model.h5')

def is_cat(image_path):
    img = image.load_img(image_path, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)
    return prediction[0][0] > 0.5

# 예측 테스트
test_image_path = 'path/to/test_image.jpg'
print("Is this image a cat?", is_cat(test_image_path))