import json

def response_to_message(response, msg=None):
    data = json.dumps(response.data, default=lambda obj: None)
    code = str(response.status_code)
    if (msg):
        msg = 'message: ' + msg + ', ';
    else:
        msg = ''

    return msg + 'code:' + code + ', json:' + data
