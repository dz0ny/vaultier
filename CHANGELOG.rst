*********
Changelog
*********

RELEASE 0.7.4
-------------

* [bugfix] SITE_URL http scheme in docker and deb package
* [bugfix] Background image and css optimalizations
* [bugfix] Roles read and create could not access any object
* [bugfix] Role create could not be created
* [bugfix] User invited to vault with manage role can edit vault settings

RELEASE 0.7.3
-------------

* [bugfix] Logout feature remove all credentials from browser even if remembered
* [feature] Documentation improvements and fixes
* [feature] UI fixes
* [bugfix] Links and logo image in emails
* [bugfix] Statistic crontab fix.
* [feature] Added hashed uid of vaultier instance based on SITE_URL to statistics

Release 0.7.2
-------------
* [bugfix] Registration error when timestamp to vary from server
* [feature] Favicon and page titles

Release 0.7.1
-------------
* [bugfix] Ubuntu/Debian package
* [bugfix] Anonymous statistics

Release 0.7.0
-------------
* [feature] #200 Update build system
* [feature] Refactored mailer module and added email notification on workspacekey acquired
* [feature] #195 Search usability - make search window more responsive
* [feature] #92 Get rid of Service.Environment
* [feature] #140 When inviting user email should be part of selected username wording
* [bugfix] Display message "No matches found" when search box contains no results
* [bugfix] Search box remembered old names.
* [feature] #199 Redesign cards and vault item
* [feature] #180 clever footer
* [feature] #80 Generate random password on secret creation
* [feature] #207 Migrate rendering of secret list items to view with computed templateName

Release 0.6.5
-------------
* [hotfix] #185 When secret file created, after return to secret list file to download is missing

Release 0.6.4
-------------
* [hotfix] Allow invitation to user that have an email that begins with a number

Release 0.6.3
-------------
* [hotfix] fix transition between WorkspaceNoKeysRoute to WorkspaceIndexRoute
* [hotfix] malformed template on secrets index

Release 0.6.2
-------------
* [hotfix] the url for a new created lostkey request was malformed

Release 0.6.1
-------------
* Initial release
