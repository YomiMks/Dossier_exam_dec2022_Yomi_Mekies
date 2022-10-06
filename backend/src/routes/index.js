module.exports = (app) => {

    require('./user')(app)
    require('./permissions')(app)
    require('./structures')(app)
    require('./partners')(app)

}
