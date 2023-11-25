const express=require('express');
const app=express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}))

const productData=[];

app.listen(2000,()=>{
    console.log('connected to server at 2000');
})

//post api

app.post('/api/add_product',(req,res)=>{
    console.log("result",req.body)
    const pdata={
        "id":productData.length+1,
        "pname":req.body.pname,
        "pprice":req.body.pprice,
        "pdesc":req.body.pdesc
    };  

    productData.push(pdata);
    console.log("final",pdata);

    res.status(200).send({
        "status_code":200,
        "message":"Product added successfully",
        "product":pdata
    })
})

app.get('/api/get_product',(req,res)=>{

        if(productData.length>0)
        {
             res.status(200).send({
                'status_code':200,
                'products':productData
             })
        }else
        {
           res.status(200).send({
            'status_code':200,
            'products':[]
           })
        }
       
    
})


app.put('/api/update_product/:id',(req,res)=>{
    var id=req.params.id *1;
   var index = productData.findIndex(product => product.id == id);
    productData[index]=req.body;

    res.status(200).send({
        'status':'success',
        'message':'Product updated '
    })
})

app.delete('/api/delete_product/:id',(req,res)=>{
   var id=req.params.id *1;
   var index = productData.findIndex(product => product.id == id);
   productData.splice(index,1);

    res.status(200).send({
        'status':'success',
        'message':'Product deleted'
    })
})