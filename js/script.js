/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
******************************************/

const listItems = document.querySelector('.student-list').children;
const itemsToDisplay = 10;

/**
* Hide list items outside of desired indexes
* @param {HTMLCollection} listItems - A HTML Collection of list items
* @param {number} pageNumber - The currently visible page
*/
function showPage (listItems, pageNumber) {
  const startIndex = (pageNumber * itemsToDisplay) - itemsToDisplay;
  const endIndex = pageNumber * itemsToDisplay;

  // Stop execution if list is empty
  // TODO: Add checks for undefined or null
  if (listItems.length === 0) {
    throw Error('List is empty');
  }

  for (let i = 0; i < listItems.length; i++) {
    let currentItem = listItems[i];
    if (i >= startIndex && i <= endIndex) {
      currentItem.style.display = 'block';
    } else {
      currentItem.style.display = 'none';
    }
  }
}

/**
* Create an HTML element
*
* @param {string} elementName - The element type
* @param {Array<Object>} attributes - An array of objects containing properties and values
* @returns {HTMLElement} element - An HTML element
*/
function createElement (elementName, attributes) {
  const element = document.createElement(elementName);

  // Check if the function call has attribute argument
  // If has attributes, loop through argument object and append attributes to element
  if (attributes) {
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      element[attribute.property] = attribute.value;
      // Check if the attribute has a class array object
      if (attribute.property === 'class') {
        for (let j = 0; j < attribute.value.length; j++) {
          element.classList.add(attribute.value[j]);
        }
      }
    }
  }

  return element;
}




/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
