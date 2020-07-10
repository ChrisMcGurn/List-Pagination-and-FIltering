/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
******************************************/

const listItems = document.querySelector('.student-list').children;
const itemsToDisplay = 10;

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
      if (attribute.property === 'classList' && attribute.property.length > 1) {
        for (let j = 0; j < attribute.value.length; j++) {
          element.classList.add(attribute.value[j]);
        }
      }
    }
  }
  return element;
}

function createAndAppendElement (elementName, attributes, appendTo) {
  const element = createElement(elementName, attributes);
  document.querySelector(appendTo).appendChild(element);
  return element;
}

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

function appendPageLinks(list) {
  /********************************
  * Create page link elements
  * THIS LOOKS LIKE A FUCKING MESS. REFACTOR PLS
  ********************************/
  const div = createAndAppendElement(
    'div',
    [{
      property: 'className',
      value: 'pagination'
    }],
    '.page'
  );

  const ul = createAndAppendElement(
    'ul',
    [{
      property: 'className',
      value: 'pagination__list'
    }],
    '.pagination'
  );

  // Create and append li and links
  const numberOfLinks = Math.ceil(list.length / itemsToDisplay);
  for (let i = 0; i < numberOfLinks; i++) {
    let pageNumber = i + 1;
    let li = createAndAppendElement(
      'li',
      [{
        property: 'className',
        value: 'pagination__list-item'
      }],
      '.pagination__list'
    ).appendChild(createElement('a', [{property: 'href', value: '#'}, {property: 'textContent', value: pageNumber}]));
  }

  // Functionality
  ul.addEventListener('click', (e) => {
    const target = e.target;
    showPage(listItems, target.textContent);
  });
}

showPage(listItems, 1);
appendPageLinks(listItems);


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
