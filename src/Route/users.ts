import { Router } from "express"
import bcrypt from 'bcrypt';
import User from "../Model/User";
import Product from "../Model/Product";
import Review from "../Model/Review";


const router = Router();
//Create Or Register User
router.post('/signup',async(req,res)=>{
   
    try{
        const salt =  bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(req.body.password,salt);

        // @ts-ignore
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }) 
        const saveUser = newUser.save()
        res.json(newUser)
    }
    catch(err){
        res.status(401).json(err)
    }
})

//Get All User
router.get('/',async(req,res)=>{
    try{
       User.find({}, function (err, users) {
            
        res.json(users)
          });
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Get User by Email
router.get('/email/:email',async(req,res) => {
    try{
        const user = await User.find({email:req.params.email})
        res.status(200).json(user)
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Login User

router.post('/', async(req,res)=>{
    
    try{

       const user = await User.findOne({email:req.body.email})
        if(user){
            if(await bcrypt.compare(req.body.password,user.password)){
                res.status(200).json(user)
                
            }
            else{
                res.status(401).json("Incorrect Password...")
            }
        }
        else{
            res.status(404).json("There is no account with this email...")
        }

    }

    catch(err){
        res.status(404).json(err)
    }
    
    
})

//Get User by Id
router.get("/:id",async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch(err){
        res.status(404).json(err)
    }
    
})


//User CART UPDATE
router.put("/:userId/:productId",async(req,res) =>{
    try{
        const user = await User.findById(req.params.userId)
        const product = await Product.findById(req.params.productId)

         await user.updateOne({$push:{Cart: {id:product._id, name:product.name, brand:product.brand, price: product.price, quantity:1,img:product.img[0],size:product.availabe_size[0],color:product.availabe_color[0]}}})

        res.json("product added...")
       
    }
    catch(err){
        res.status(404).json(err)
    }
})


//Update cart quantity
router.put("/cartUpdate/:userId/:productId/:quantity",async(req,res)=>{
    try{
        /*const user = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
               Cart:  req.params.quantity
            }
        })*/
        const user = await User.findById(req.params.userId)
        //const query ={id:req.params.userId,Cart.quantity}
        const query = {_id: req.params.userId,"Cart.id":req.params.productId}
       // const query = { name: "Steve Lobsters", "items.type": "pizza" };
        const updateDocument = {
          $set: { "Cart.$.quantity": req.params.quantity }
        };
        const result = await User.updateOne(query, updateDocument);
        res.json("done")
      
    }
    catch(err){
        res.json(err)
    }
    
    
})


//Delete Product
router.put("/removeProduct/:id/:productId",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        //const product = await Product.findById(req.params.productId)
        await user.updateOne({$pull:{"Cart":{"id":req.params.productId}}})

          res.json("done")
        
    }
    catch(err){
        res.status(404).json(err)
    }
})





export default router;