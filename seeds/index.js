const mongoose=require('mongoose');
const Campground=require('../models/campground');
const cities=require('./cities');
const {descriptors,places}=require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/Summer-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
  console.log("Database Connected!");
});

const sample=array=> array[Math.floor(Math.random()*array.length)];
// 'https://source.unsplash.com/collection/483251'  //we will get different image everytime using this API
const seedDB=async()=>{
  await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000=Math.floor(Math.random()*1000);
      const price = Math.floor(Math.random() * 20) + 10;
        const camp=new Campground({
            author: '6666bef6be9a3f4cfe4ba67b',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ipsum incidunt, repellendus corporis corrupti harum eum cum recusandae, eveniet distinctio a, saepe voluptatibus! Repudiandae, eos! Ea aliquid iure nihil id?',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude, 
                cities[random1000].latitude 
              ] 
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dg9qjidvc/image/upload/v1718007849/SummerCamp/kxd0ix8ha3byyhifaszb.jpg',
                  filename: 'SummerCamp/kxd0ix8ha3byyhifaszb'
                },
                {
                  url: 'https://res.cloudinary.com/dg9qjidvc/image/upload/v1718007849/SummerCamp/pkpym8kj1pcsceyko0hb.jpg',
                  filename: 'SummerCamp/pkpym8kj1pcsceyko0hb'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})

