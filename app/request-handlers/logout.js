/**
 * Created by skitsanos on 5/24/17.
 */
var handler = function (req, res)
{
    delete req.session.user;
    delete req.session.authenticated;
    res.redirect('/');
};
module.exports = handler;
