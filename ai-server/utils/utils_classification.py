def choose_top_class(pred_result,minor_onehot,num) :
    category = minor_onehot.columns
    return sorted(zip(pred_result,category), reverse=True)[:num]