'use strict';
var _ = require('lodash');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var app = require('../server/server.js');

var items = [
  {id:1, title:"First message", text:"This is a first."},
  {id:2, title:"Second message", text:"This is a second."}
];
var message_data = {title:"New message", text:"This is a new message."};

var Message = app.models.Message;

beforeEach(function() {
  return Message.destroyAll()
    .then(function() {
      return Message.create(items);
    });
});

describe('Messages API', function(){

  describe('messages listing', function(){
    it('should return list of message items', function(done) {
      request(app)
        .get('/api/messages/list')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(_.map(items, function(item){return {id:item.id, title:item.title};}))
        .end(done);
    });
  });

  describe('get message by id', function(){
    it('should return existing message', function(done) {
      request(app)
        .get('/api/messages/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(items[1])
        .end(done);
    });
    it('should return 404 for non-existing message', function(done) {
      request(app)
        .get('/api/messages/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

  describe('message creation', function(){
    it('should add new message', function(done) {
      request(app)
        .post('/api/messages')
        .send(message_data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          return Message.findOne({where:{title: message_data.title}}).then(function(message){
            // added
            expect(message.id).to.exist;
            expect(message.text).to.equal(message_data.text);

            // returned
            expect(message.id.toString()).to.equal(res.body.id);
            expect(message.title).to.equal(res.body.title);
            expect(message.text).to.equal(res.body.text);

            return done();
          }).catch(function(err){
            return done(err);
          });
        });
    });
  });

  describe('update message', function(){
    it('should update existing message', function(done) {
      request(app)
        .put('/api/messages/1')
        .set('Accept', 'application/json')
        .send(message_data)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          return Message.findById(1).then(function(message){
            // updated
            expect(message.title).to.equal(message_data.title);;
            expect(message.text).to.equal(message_data.text);

            // returned
            expect(message.id).to.equal(res.body.id);
            expect(message.title).to.equal(res.body.title);
            expect(message.text).to.equal(res.body.text);

            return done();
          }).catch(function(err){
            return done(err);
          });
        });
    });
  });

  describe('delete message', function(){
    it('should delete existing message', function(done) {
      request(app)
        .delete('/api/messages/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          return Message.findById(1).then(function(message){
            if (null === message) {
              return done();
            }
            return done("Can't delete message");
          }).catch(function(err){
            return done(err);
          });
        });
    });
  });

});
