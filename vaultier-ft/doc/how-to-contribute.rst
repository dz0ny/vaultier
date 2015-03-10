### Install Node Version Manager (https://github.com/creationix/nvm)

For manual install create a folder somewhere in your filesystem with the `nvm.sh` file inside it. I put mine in a folder called `nvm`.

Or if you have `git` installed, then just clone it, and check out the latest version:

    git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

To activate nvm, you need to source it from your shell:

    source ~/.nvm/nvm.sh

I always add this line to my `~/.bashrc`, `~/.profile`, or `~/.zshrc` file to have it automatically sourced upon login.
Often I also put in a line to use a specific version of node.

### Install io.js in latest version (https://github.com/creationix/nvm)

    nvm install iojs/1.0.2

