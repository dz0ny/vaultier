Po.NS('Ember.Tree');

Ember.Tree.TreeNodeView = Ember.View.extend({
    opened: false,
    loading: false,
    branch: function () {
        return this.get('content').branch;
    }.property(),
    subTreeBranchView: null,
    loadedData: false,
    tagName: 'li',
    // class names that determine what icons are used beside the node
    classNameBindings: ['opened: tree-branch-open', 'branch:tree-branch-icon:tree-node-icon'],
    templateName: 'Shared/Tree/EmberTreeNode',

    collapse: function () {
        var index = this.get('parentView').indexOf(this) + 1;
        this.get('parentView').removeAt(index);
        this.set('opened', false);
    },

    loadData: function () {
        return new Ember.RSVP.Promise(function (resolve) {
            Ember.run.later(this, function () {
                resolve([
                    {
                        'name': 'John',
                        'age': 10,
                        'branch': true
                    },
                    {
                        'name': 'Tom',
                        'age': 5,
                        'branch': false
                    },
                    {
                        'name': 'Paul',
                        'age': 7,
                        'branch': true
                    }
                ]);
            }, 1000)
        })
    },

    getSubNodeViewClass: function() {
        return Ember.Tree.TreeNodeView;
    },

    createSubBranchView: function () {
        var view = Ember.Tree.TreeView.create({
            itemViewClass: this.getSubNodeViewClass(),
            container: this.get('container')
        });
        return view;
    },

    expand: function () {
        // only branch could be expanded
        if (this.get('loadedData')) {
            // user wants to open the branch and we have already created the view before
            var index = this.get('parentView').indexOf(this) + 1;
            this.get('parentView').insertAt(index, this.get('subTreeBranchView'));
            this.set('opened', true);
        } else if (this.get('branch') && !this.get('loading')) {
            // user wants to open the branch for the first time
            this.set('loading', true)

            Ember.RSVP.resolve()
                .then(this.loadData.bind(this))
                .then(function (content) {
                    var subTreeBranchView = this.createSubBranchView();
                    subTreeBranchView.set('content', content)
                    var index = this.get('parentView').indexOf(this) + 1;
                    this.get('parentView').insertAt(index, subTreeBranchView);
                    this.set('opened', true);
                    this.set('subTreeBranchView', subTreeBranchView);
                    this.set('loadedData', true);
                    this.set('loading', false)
                }.bind(this))
        }
    },


    click: function (evt) {
        if (this.get('opened')) {
            // user wants to close the branch
            this.collapse();
        } else {
            // user wants to open branch
            this.expand();
        }
    }
});

Ember.Tree.TreeView = Ember.CollectionView.extend({
    tagName: 'ul',
    content: [
        {
            'name': 'John',
            'age': 10,
            'branch': true
        },
        {
            'name': 'Tom',
            'age': 5,
            'branch': true
        },
        {
            'name': 'Paul',
            'age': 7,
            'branch': true
        }
    ],
    classNames: ['treebranch'],
    itemViewClass: 'Ember.Tree.TreeNodeView'
});
