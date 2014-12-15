from base import *  # noqa

DEBUG = True
TEMPLATE_DEBUG = DEBUG

# Email address to allow send_mail() method
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

VAULTIER.update({
    # for all users same private key is used
    'dev_shared_key': True,

    # following public key used in case dev_shared_key enabled
    'dev_shared_key_public': ''
        '-----BEGIN PUBLIC KEY-----\n'
        'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgEjjYmOd1Uv5e0n3XA59PsdNw6+a\n'
        'ol5UBknVc4ABIjyxF1m7nvl2tMgJAo8r1f91BLO70/dTVyYs1K0e5Yy3oGq9KYr3\n'
        'rnGmgTKq0b/BFjvkPdWwM15eMSBx8tBDPn5lj77Je4lDGsgVVlzjDsY4jh951tvn\n'
        '/0X1UsYUKuuTrjwvAgMBAAE=\n'
        '-----END PUBLIC KEY-----\n'
    ,

    # following private key used in case dev_shared_key enabled
    'dev_shared_key_private': ''
        '-----BEGIN RSA PRIVATE KEY-----\n'
        'MIICWgIBAAKBgEjjYmOd1Uv5e0n3XA59PsdNw6+aol5UBknVc4ABIjyxF1m7nvl2\n'
        'tMgJAo8r1f91BLO70/dTVyYs1K0e5Yy3oGq9KYr3rnGmgTKq0b/BFjvkPdWwM15e\n'
        'MSBx8tBDPn5lj77Je4lDGsgVVlzjDsY4jh951tvn/0X1UsYUKuuTrjwvAgMBAAEC\n'
        'gYA2J+zUw1LWDloSjR3zDg/1GcyJz0VQ/PFnLpeQxkbf/VyyKXtnM1IDRt6F7jYk\n'
        'hpely6skmuGn1at3rfs04MLpgNDRfwGu/2OlNkdatfz7o5dj2pRgOHrLqfkzNfyp\n'
        'EeC7qjOXfUYsoNRQkpzKb9d7/39ydak9WWpdcEuD69ZBEQJBAI6p1v0mE3SGWqR5\n'
        '8qwvT7kNa3WiV5p0p0YFvjSQMtaW22aw4c0lZqZ6ru4E3Vm0UmAKqXQAZeJXKDA/\n'
        'Vh9Jrr0CQQCCywSNowh2tfAwFUe/uXru+hQE9i7/5/tu9n72NsUIBI/Xl5i/CXww\n'
        'AdRs5gHUNduTA2uSxgcfQUWTCV7jFwtbAkB9cChwfcItetTIOdF+RDs84ufRjuSo\n'
        'Elnh37rWTNPmis5vBKgF0RTo3IZjEjPuY/bqK3XDYXY0BZ54jbgT2p2hAkAppgZE\n'
        'J+c5DgR2+z/GsISR9rZLQi2DNdbd5cZWFui0/ebkCxULuDSAgQSozLFGZwQNk2g8\n'
        '66w26q0B/ljlzV/DAkAfFqgAIsnUPJ2iZSSmVweuMLNj7rv2v48Se8gG0k1/+GGa\n'
        'AKN067aWUkqPnSzeZi50f9ViMNuBd2bksJpGzC5c\n'
        '-----END RSA PRIVATE KEY-----\n'
    ,

    # Token is available to copy/paste in user profile box
    'dev_show_token': True,
    # current developer email used for default logging when developing
    'dev_email': '',
    # all emails goes to only this use
    'dev_mail_to': '',
    # 1 hour in milliseconds, used to calculate the expiration date
    # of a lostkey resource
    'lostkey_hash_expiration_time': 3600000,
    # Default email address from which we send emails
    'from_email': 'info@localhost',
    # Max difference between timestamp from server and from front-end
    # (in seconds)
    'login_safe_timestamp': 15,


})

SECRET_KEY = 'DEV_KEY_DEV_KEY_DEV_KEY_DEV_KEY_'

# Celery
CELERY_ALWAYS_EAGER = True
CELERY_EAGER_PROPAGATES_EXCEPTIONS = True
