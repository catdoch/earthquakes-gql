import { friendlyDate } from '../../client/src/utils/getDate';

describe('My First Test', () => {
    it('Visits the site', () => {
        cy.visit('https://earthquake-gql.herokuapp.com/');
    });

    it('Has the correct date in the title', () => {
        cy.contains(friendlyDate());
    });

    it('Changes the select to mag 7', () => {
        cy.get('.mag-changer').select('7');
    });

    it('Changes the select to mag 6', () => {
        cy.get('.mag-changer').select('6');
    });

    it('Changes the select to mag 5', () => {
        cy.get('.mag-changer').select('5');
    });

    it('Changes the select to mag 4', () => {
        cy.get('.mag-changer').select('4');
    });

    it('Changes the select to mag 3', () => {
        cy.get('.mag-changer').select('3');
    });
});