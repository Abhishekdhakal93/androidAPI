process.env.NODE_ENV = "test"

const User=require('../model/user');
const Place=require('../model/place');
const Packages=require('../model/packages');
const Contact=require('../model/contact_us');
const Booking=require('../model/booking');
var chai =require("chai");
var chaiHttp=require("chai-http");
var app=require("../index");

const should = chai.should();


chai.use(chaiHttp);


//
describe('/GET user', () => {
  it('it should Get all users', (done) => {
      chai.request(app)
      .get('/travel/v1/user/get_all')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});


describe('/GET booking', () => {
  it('it should Get all booking', (done) => {
      chai.request(app)
      .get('/travel/v1/booking/get_all_booking')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});


describe('/GET contact', () => {
  it('it should Get all contact', (done) => {
      chai.request(app)
      .get('/travel/v1/contact/get_all_contact')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});


describe('/GET booking', () => {
  it('it should Get all booking list', (done) => {
      chai.request(app)
      .get('/travel/v1/booking/getallbookinglist')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});



describe('/GET place', () => {
  it('it should Get all place list', (done) => {
      chai.request(app)
      .get('/travel/v1/place/get_all_palce')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});


describe('/GET packages', () => {
  it('it should Get all packages list', (done) => {
      chai.request(app)
      .get('/travel/v1/packages/get_all_packges')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});



//create routes testing
describe('/POST user', () => {
  it('it should post the user info', (done) => {
      const user = {
        first_name: "Raman",
        last_name: "Phadera",
        contact: "9866430207",
        email: "fadera@gmail.com",
        address: "kathmandu",
        password: "fadera123",
        image: "raman.jpg"
         
      };
      chai.request(app)
      .post('/travel/v1/user/register')
      .send(user)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
  });
});


describe('/POST place', () => {
  it('it should post the place info', (done) => {
      const place = {
        place_name:"Mount Everest",
        image:"mouont.js",
        country:"Nepal",
        city:"Solukhumbu",
        address:"Solukhumbu"
         
      };
      chai.request(app)
      .post('/travel/v1/place/add_place')
      .send(place)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
  });
});



describe('/POST contact', () => {
  it('it should post the contact info', (done) => {
      const contact = {
        name:"Raman Phadera",
        email:"fadera@gmail.com",
        subject:"visit nepal",
        message:"visit nepal"
         
      };
      chai.request(app)
      .post('/travel/v1/contact/add_contact')
      .send(contact)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
  });
});




describe('/POST packages', () => {
  it('it should post the packages info', (done) => {
      const packages = {
        packages_name: "Mount Everest",
        packages_type: "OneDay",
        duration: "6 Days",
        description: "World Highest peak which is located in Neapl",
        price: "7000",
        image: "mount.jpg",
        itinary: "solukhumbu",
        placePlaceId:"1" 
         
      };
      chai.request(app)
      .post('/travel/v1/packages/add_packages')
      .send(packages)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
  });
});



describe('/POST booking', () => {
  it('it should post the booking info', (done) => {
      const booking = {
        no_people:"4",
        date:"2/2/202",
       userUserId:"2",
       packagePackagesId:"5"
         
      };
      chai.request(app)
      .post('/travel/v1/booking/addBooking')
      .send(booking)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
  });
});




describe('/POST user', () => {
  it('it should post the Login info', (done) => {
      const user = {
          email: " fadera@gmail.com",
          password: "fadera123"
         
      };
      chai.request(app)
      .post('/travel/v1/user/login')
      .send(user)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
  });
});


//update routes testing
describe('/PUT/:id place', () => {
  it("should not update the place info", (done) => {
      const place = {
        place_name: "m",
        country: "Nep",
      }
      const id = 2;
       chai.request(app)
       .put('/travel/v1/place/updateplace'+ id)
       .send(place)
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});



describe('/PUT/:id packages', () => {
  it("should not update the packages info", (done) => {
      const packages = {
        packages_name: "m",
        price: "10000000000",
      }
      const id = 5;
       chai.request(app)
       .put('/travel/v1/packages/updatepackage'+ id)
       .send(packages)
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});

//delete routes testing
describe('/DELETE/:id packages', () => {
  it("should delete the packages info", (done) => {
      
      const id = 6;
       chai.request(app)
       .put('/travel/v1/packages/deletepackage'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});



describe('/DELETE/:id user', () => {
  it("should delete the user info", (done) => {
      
      const id = 6;
       chai.request(app)
       .put('/travel/v1/user/deleteuser'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/DELETE/:id place', () => {
  it("should delete the place info", (done) => {
      
      const id = 36;
       chai.request(app)
       .put('/travel/v1/place/deleteplace'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/DELETE/:id booking', () => {
  it("should delete the booking info", (done) => {
      
      const id = 1;
       chai.request(app)
       .put('/travel/v1/booking/deletebooking'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/DELETE/:id contact', () => {
  it("should delete the contact info", (done) => {
      
      const id = 2;
       chai.request(app)
       .put('/travel/v1/contact/deletecontact'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});



//Get by id and name testing
describe('/GET/:id packages', () => {
  it("should get the packages info by ID", (done) => {
      
      const id = 2;
       chai.request(app)
       .put('/travel/v1/packages/getPackageById'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/GET/:id user', () => {
  it("should get the user info by ID", (done) => {
      
      const id = 2;
       chai.request(app)
       .put('/travel/v1/user/get_user_by_id'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/GET/:id place', () => {
  it("should get the place info by ID", (done) => {
      
      const id = 2;
       chai.request(app)
       .put('/travel/v1/place/getPlaceById'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/GET/:id place', () => {
  it("should get the city info by ID", (done) => {
      
      const id = 2;
       chai.request(app)
       .put('/travel/v1/place/get_city_by_id'+ id)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});



describe('/GET/:name place', () => {
  it("should get the city info by name", (done) => {
      
      const name = "solukhumbu";
       chai.request(app)
       .put('/travel/v1/place/get_place_by_city'+ name)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


describe('/GET/:name place', () => {
  it("should get the packages info by package type", (done) => {
      
      const name = "OneDay";
       chai.request(app)
       .put('/travel/v1/place/get_packages_by_type'+ name)
       
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});












  


  