const express=require('express');
const app=express();
const product=require('./product');
const mongoose=require('mongoose');

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}))

const productData=[];
//mongoose connection
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://raguraman:admin123@cluster0.e04s70u.mongodb.net/flutterdb')
console.log('connected to mongoose');



//post api
app.post('/api/add_product',async(req,res)=>{
    console.log("result",req.body)
    let data=product(req.body);

    try{
        let dataToStore=await data.save()
        res.status(200).json(dataToStore);

    }catch(e)
    {
        res.status(400).json({
            'status': error.message
        })
    }

    // const pdata={
    //     "id":productData.length+1,
    //     "pname":req.body.pname,
    //     "pprice":req.body.pprice,
    //     "pdesc":req.body.pdesc
    // };  

    // productData.push(pdata);
    // console.log("final",pdata);

    // res.status(200).send({
    //     "status_code":200,
    //     "message":"Product added successfully",
    //     "product":pdata
    // })
})


//get api
app.get('/api/get_product',async(req,res)=>{
   
try{
    let data=await product.find()
    console.log(data);
    res.status(200).json(data)

}catch(e)
{
  res.status(200).json(
{
    'error':e.message
}
  )
}
        // if(productData.length>0)
        // {
        //      res.status(200).send({
        //         'status_code':200,
        //         'products':productData
        //      })
        // }else
        // {
        //    res.status(200).send({
        //     'status_code':200,
        //     'products':[]
        //    })
        // }
})


//update api
app.patch('/api/update_product/:id',async(req,res)=>{

    let id=req.params.id;
    let updatedData=req.body;
    let options={new:true}
  try{
    var data=await product.findByIdAndUpdate(id,updatedData,options)
    res.send(data)
  }catch(e)
  {
    res.send(err.message)
  }
    //     var id=req.params.id *1;
//    var index = productData.findIndex(product => product.id == id);
//     productData[index]=req.body;

//     res.status(200).send({
//         'status':'success',
//         'message':'Product updated '
//     })
})


//delete api
app.delete('/api/delete_product/:id',async(req,res)=>{
    var id=req.params.id;
    try{
       const data= await product.findByIdAndDelete(id);
       res.json({
        'status':"deleted product from database"
       })
    }catch(e)
    {
        res.send(e.message)
    }
//    var id=req.params.id *1;
//    var index = productData.findIndex(product => product.id == id);
//    productData.splice(index,1);

//     res.status(200).send({
//         'status':'success',
//         'message':'Product deleted'
//     })
})

//create and start server 
app.listen(2000,()=>{
    console.log('connected to server at 2000');
})
