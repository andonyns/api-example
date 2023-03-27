const mockingoose = require('mockingoose');
const express = require("express");

const model = require('../../models/index');
const controller = require('../tutorial.controller');

describe('Tutorial tests', () => {
    it('should be able to find a tutorial', async () => {

        const _doc = {
            _id: '507f191e810c19729de860ea',
            title: 'A Title',
            description: 'A Description',
          };
      
        mockingoose(model.tutorials).toReturn(_doc, 'findOne');


        let request = {
            params: {id: '507f191e810c19729de860ea' }
        };

        let response = {
            status: jest.fn(),
            send: jest.fn()
        };
        await controller.findOne(request, response);

        expect(response.send).toHaveBeenCalledWith(expect.objectContaining({
            title: _doc.title,
            description: _doc.description
        }));

    });
});