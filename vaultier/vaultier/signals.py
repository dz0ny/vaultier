from accounts.models import register_signals as lostkey_register_signals


def init_signals():
    ##################################################
    #LostKey custom signals
    ##################################################
    lostkey_register_signals()
