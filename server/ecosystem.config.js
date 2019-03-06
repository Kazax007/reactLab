module.exports = {
    apps: [
        {
            name: 'ONIT-1',
            script: 'server.js',
            watch: true,
            ignore_watch: ['node_modules', 'uploads', 'client']
        }
    ]
};