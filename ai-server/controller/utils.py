import os
os.chdir('..')

import requests
import numpy as np
from numpy import dot
from numpy.linalg import norm
from PIL import Image
from io import BytesIO
from keras.applications import resnet50

def calc_cos_sim(A, B):
    A = A.flatten()
    B = B.flatten()
    return dot(A, B)/(norm(A)*norm(B))

def get_image_array(url,fourth_dimension=True) :
    size=(224, 224)
    
    res = requests.get(url)
    image = BytesIO(res.content)
    image = Image.open(image)
    image = image.resize(size)

    image = np.array(image)
    if fourth_dimension : 
        image = np.expand_dims(image, axis=0)
        image = resnet50.preprocess_input(image) 

    return image