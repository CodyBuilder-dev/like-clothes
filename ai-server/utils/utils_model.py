import tensorflow as tf
from tensorflow.keras import optimizers
from tensorflow.keras.backend import clear_session
from tensorflow.keras.applications import resnet50, vgg16, vgg19, inception_resnet_v2,inception_v3, densenet
from tensorflow.keras.applications import mobilenet,mobilenet_v2, nasnet, xception
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.layers import Dense, Conv2D,MaxPooling2D,GlobalAveragePooling2D, Dropout

from sklearn.cluster import KMeans

def select_pre_model(name,weight,include_top=True) :
    """
    Desc : 원하는 형태와 weight를 가진 pretrained 모델 불러오기
    In :
        name=모델명
        weight=웨이트 종류
        include_top=Input/Output layer 포함 여부(형태 달라짐)
    Out : model = 원하는 모델
    """
    name_dict = {'resnet50':resnet50.ResNet50,
                'vgg16':vgg16.VGG16,
                 'vgg19':vgg19.VGG19,
                 'inception_v2': inception_resnet_v2.InceptionResNetV2,
                 'inception_v3' : inception_v3.InceptionV3,
                 'densenet121':densenet.DenseNet121,
                 'densenet169':densenet.DenseNet169,
                 'densenet201':densenet.DenseNet201,
                 'mobilenet':mobilenet.MobileNet,
                 'mobilenet_v2': mobilenet_v2.MobileNetV2,
                 'nasnet' : nasnet.NASNetMobile,
                 'xception':xception.Xception
                }
    if include_top :
        return name_dict[name](weights=weight)
    else :
        return name_dict[name](weights=weight,include_top=False,input_shape=(224,224,3))

def load_class_model(num_category,weight_path) :
    """
    Desc : Classification 모델을 반환해주는 함수
    In : 
        name = 불러오고자 하는 모델 이름
        num_category = 카테고리 개수(기본 40개로 고정)
        weight_path = pretrained된 weight
    Out : class_model
    """
    top=False
    name="vgg19"
    pre_model = select_pre_model(name,'imagenet',include_top=top)
    
    new_model = Sequential()
    new_model.add(pre_model)
    new_model.add(GlobalAveragePooling2D())
    new_model.add(Dense(num_category,activation="softmax"))

    new_model.load_weights(weight_path)

    return new_model

def load_feature_model() :
    """
    Desc : Feature Extraction 모델을 반환해주는 함수
    IN : 
    Out : feature_model
    """
    top= True # True/False : input/output layer 포함/미포함
    name = 'vgg19'
    pre_model = select_pre_model(name,'imagenet',include_top=top)

    last_layer = -2
    new_model = Model(pre_model.inputs, pre_model.layers[last_layer].output)

    return new_model

def load_cluster_model(k=6) :
    return KMeans(n_clusters = k, random_state  = 0)