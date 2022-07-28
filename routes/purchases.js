const express = require('express');
const Router = express.Router();

const Purchase = require('../models/Purchase');

Router.get('/', ( req, res) => {
    Purchase.find().then( data => {
        res.send( data );
    })
})

Router.post('/', ( req, res ) => {
    console.log( req.body );
    const newItem = new Purchase( req.body );
    newItem.save().then( data => {
        res.send( data );
    })
});

Router.delete('/:id', (req, res) => {
    
    Purchase.deleteOne ({ _id : req.params.id }).then(data => {
        console.log(data)
    })
    

    if( data.deletedCount == 1) {
        res.send({ message: "Item deleted"})
    } else {
        res.send({ message : "Item not found"})
    }

})

Router.put('/:id', (req,res) => {
    console.log(req.params.id)
    Purchase.updateOne({ _id : req.params.id }, req.body ).then(data => {
        console.log(data)
    })

    if (data.modifiedCount == 1 ) {
        res.send({ message : "Item Updated"});
    } else {
        res.send ({ message : "Item not found"})
    }
})


module.exports = Router;
