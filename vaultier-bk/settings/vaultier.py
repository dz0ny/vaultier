VAULTIER = {
    # allow registration of anonymous user. When disabled only invited user can register
    'auth_registration_allow': True,

    # token lifetime (in seconds)
    # when token is not used for defined time its considered as expired, and consequently deleted
    'auth_token_lifetime': 60*60,







    # Following are currently disabled



    # 1 hour in milliseconds used to calculate the expiration time
    # on api.lostkey module
    'lostkey_hash_expiration_time': 60*60*1000,

    # Default email address from which we send emails
    'from_email': 'noreply@vaultier.org',

    # Max difference between timestamp from server and from front-end
    # (in seconds)
    'login_safe_timestamp': 15,




    # invitation lifetime (in hours)
    'invitation_lifetime': 7,

    # When anonymous usage statistics is enabled, Vaultier periodically
    # anonymously notifies its maintainer and developer about running
    # instance of Vaultier.
    # As Vaultier is Open Source we kindly ask you to leave this option
    # enabled and let us know how many instances are deployed.
    # We send these statistics data: hashed id, version, count of workspaces,
    # vaults, cards, secrets, users and members
    'allow_anonymous_usage_statistics': True,


    # Vaultier blog news API endpoint. Must end with trailing slash
    'news_url': 'http://vaultier.org/api/entries/',

    # For how long wait for response in seconds.
    'news_connection_timeout': 2,

    # For how long news should be hold in cache in seconds. Vaultier API
    # provides ETag functionality, so you can increase this
    # value whatever you want.
    'news_cache_timeout': 60*10,
}
