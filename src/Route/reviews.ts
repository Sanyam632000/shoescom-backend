import {Router} from 'express';
import Review from  "../Model/Review";

const router = Router();

//Create Review
router.post("/:userId/:productId",async(req,res) => {   
    const newReview = Review({
        Review: req.body.Review,
        ReviewTitle: req.body.ReviewTitle,
        ReviewByUserId: req.params.userId,
        ReviewOnProductId: req.params.productId
    })
    try{
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    }
    catch(err){
        res.status(404).json(err)
    }
})

//get review by productid
router.get("/:productId", async(req,res) =>{
    try{
        const getReviews= await Review.find({ReviewOnProductId: req.params.productId})
        res.status(200).json(getReviews)
    }
    catch(err){
        res.status(404).json(err)
    }
})

//Delete Review
router.delete("/:id", async(req,res) =>{
    try{
        const reviewDeleted = await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("Review Deleted Successfully...")
    }
    catch(err){
        res.status(404).json(err)
    }
})


export default router;