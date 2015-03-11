#### Fix the bower versioning
Unable to find a suitable version for ember, please choose one:
    1) ember#~1.5.1 which resolved to 1.5.1 and is required by ember-selectize#c12b9c5d3c
    2) ember#1.10.0 which resolved to 1.10.0 and is required by vaultier
    3) ember#>= 1.0.0 which resolved to 1.10.0 and is required by ember-restless#0.6.0
    4) ember#> 1.5.0-beta.3 which resolved to 1.10.0 and is required by ember-resolver#0.1.12
    5) ember#>=1.4 <2 which resolved to 1.10.0 and is required by ember-cli-shims#0.0.3Prefix the choice with ! to persist it to bower.json

#### layout




#### Global disablements
- BetterRestless to migrate from deprecated phone repository
- Utils.Logger has been commented - migrate to service
- $.notify has been commented - migrate to service
- Kernel.loader has been commented
- this.nodekey = this.get('container').lookup('service:nodekey');  / Vaultier.__container__.lookup('service:nodekey') will not work on the models/modelsmixin because there is no container on model - use application global workeround will be used
- Po (Pohon) would be global for first version, but must be removed later


#### Fix the login
- http://localhost:4200/#/auth/login/index
- FileAPI not imported
- News are commented out
- loadRemembered is commented out
- DEPRECATION: Global lookup of Ember.Select from a Handlebars template is
