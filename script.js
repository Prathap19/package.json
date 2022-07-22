const express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());

const customers = [
    {title : 'John',id:1},
    {title : 'Peter',id:2},
    {title : 'Ram',id:3},
    {title : 'Raji',id:4},
    {title : 'Banu',id:5}
]
app.get('/',(req,res) => {res.send('welcome to REST API');})

app.get('/api/customers',(req,res) => {res.send(customers);})

app.get('/api/customers/:id',(req,res) => {
    const customer = customers.find(c=>c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style ="font-family: Malgun Gothic; color: darkred;">oops...cant find the id</h2>');
    res.send(customer);
});

app.post('/api/customers'),(req,res) => {
    const {error} = validateCustomer(req.body);
    if (error)
    {
        res.status(400).send(error.details[0].message)
        return;
    }
    const customer = {
        id:customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);

}

app.put('/api/customers/:id',(req,res) => {
    const customer = customers.find(c=>c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style ="font-family: Malgun Gothic; color: darkred;">not found!</h2>');
    const {error}= validateCustomer(req.body);
    if(error)
    {
        res.status(400),send(error.details[0].message);
        return;
    }
    customer.title = req.body.title;
    res.send(customer);
});





app.delete  ('/api/customers/:id',(req,res) => {
    const customer = customers.find(c=>c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style ="font-family: Malgun Gothic; color: darkred;">not found to be deleted</h2>');
   const index  = customers.indexof(customer);
   customers.splice(index,1);
       res.send(customer);
});



function validateCustomer(customer)
{
    const schema = {
        title : joi.string().min(3).required()
    };
    return joi.validate(customer,schema);


}


const port = process.env.PORT || 8080 ;
app.listen(port, () => console.log('listening to port ${port}...'));