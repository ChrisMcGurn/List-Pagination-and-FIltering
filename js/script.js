/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
******************************************/
// Globals
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
function showPage (list, pageNumber) {
  const startIndex = (pageNumber * itemsToDisplay) - itemsToDisplay;
  const endIndex = pageNumber * itemsToDisplay;

  // Stop execution if list is empty
  // TODO: Add checks for undefined or null
  if (list.length === 0) {
    throw Error('List is empty');
  }

  for (let i = 0; i < list.length; i++) {
    let currentItem = list[i];
    if (i >= startIndex && i <= endIndex) {
      currentItem.style.display = 'block';
    } else {
      currentItem.style.display = 'none';
    }
  }
}

function appendPageLinks(list) {
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

  // Remove old links
  const elements = document.querySelectorAll('.pagination__list > li');

  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      document.querySelector('.pagination__list').removeChild(elements[i]);
    }
  }

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

  document.querySelector('.pagination__list').firstElementChild.firstElementChild.classList.add('active');

  // Functionality
  ul.addEventListener('click', (e) => {
    const target = e.target;
    showPage(listItems, target.textContent);

    // Remove 'active' class from currently active link & append 'active' to target
    document.querySelector('.active').classList.remove('active');
    target.classList.add('active');
  });
}

function searchStudentList (list) {
  // Generate HTML elements
  const div = createAndAppendElement(
    'div',
    [{property: 'className', value: 'student-search'}],
    '.page-header');

  const form = createAndAppendElement(
    'form',
    [{property: 'className', value: 'student-search__form'}, {property: 'action', value: '#'}],
    '.student-search');

  const input = createAndAppendElement(
    'input',
    [{property: 'type', value: 'input'}, {property: 'placeholder', value: 'Search for students...'}],
    '.student-search__form');

  const submit = createAndAppendElement(
    'button',
    [{property: 'textContent', value: 'Search'}],
    '.student-search__form');

  input.addEventListener('keyup', (e) => {
    const searchResults = [];
    // Add items to list that match search query
    for (let i = 0; i < list.length; i++) {
      let currentName = list[i].children[0].children[1];
      if (currentName.textContent.includes(input.value)) {
        searchResults.push(list[i]);
      }
    }
    // Remove entries from list that do not match search query
    for (let i = 0; i < searchResults.list; i++) {
      let currentName = searchResults[i].children[0].children[1];
      if (!currentName.textContent.includes(input.value)) {
        // Remove the item
        searchResults.splice(i, 1);
      }
    }

    // Set display on all 'listItems' to 'none'
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].style.display = 'none';
    }

    showPage(searchResults, 1);
    appendPageLinks(searchResults);
  });

  submit.addEventListener('click', () => {
    const searchResults = [];
    // Add items to list that match search query
    for (let i = 0; i < list.length; i++) {
      let currentName = list[i].children[0].children[1];
      if (currentName.textContent.includes(input.value)) {
        searchResults.push(list[i]);
      }
    }
    showPage(searchResults, 1);
    appendPageLinks(searchResults);
  });
}

searchStudentList(listItems);
showPage(listItems, 1);
appendPageLinks(listItems);
