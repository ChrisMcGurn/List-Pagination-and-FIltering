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

/**
* Invokes and appends a new element to the DOM
*
* @param {string} elementName - The element type
* @param {Array<Object>} attributes - An array of objects containing properties and values
* @param {string} appendTo - The DOM element the new element will be appended to
* @returns {HTMLElement} element - An HTML element
*/
function createAndAppendElement (elementName, attributes, appendTo) {
  const element = createElement(elementName, attributes);
  document.querySelector(appendTo).appendChild(element);
  return element;
}

/**
* Hide list items outside of desired indexes
* @param {HTMLCollection} list - An HTML Collection of list items
* @param {number} pageNumber - The currently visible page
*/
function showPage (list, pageNumber) {
  const startIndex = (pageNumber * itemsToDisplay) - itemsToDisplay;
  const endIndex = pageNumber * itemsToDisplay;

  // Stop execution if list is empty
  if (!list.length) {
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

/**
* Create and append pagination element
*
* @param {HTMLCollection} list - An HTML Collection of list items
*/
function appendPageLinks(list) {
  // If any pagination links already exist, remove them from the DOM
  const elements = document.querySelectorAll('.pagination__list > li');
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      document.querySelector('.pagination__list').removeChild(elements[i]);
    }
  }

  // Create and append li and link elements
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

  // Set 'active' class on the first link
  document.querySelector('.pagination__list').firstElementChild.firstElementChild.classList.add('active');
}

/**
* Create and append search elements and functionality.
*
* @param {HTMLCollection} list - An HTML Collection of list items
*/
function searchStudentList (list) {
  const div = createAndAppendElement(
    'div',
    [{property: 'className', value: 'student-search'}],
    '.page-header'
  );

  const form = createAndAppendElement(
    'form',
    [{property: 'className', value: 'student-search__form'}, {property: 'action', value: '#'}],
    '.student-search'
  );

  const input = createAndAppendElement(
    'input',
    [{property: 'type', value: 'input'}, {property: 'placeholder', value: 'Search for students...'}],
    '.student-search__form'
  );

  const submit = createAndAppendElement(
    'button',
    [{property: 'textContent', value: 'Search'}],
    '.student-search__form'
  );

  /**
  * Manage search functionality.
  * Uses new list to pass in as function invocation arguments to showPage and appendPageLinks functions.
  */
  function showSearchResults() {
    /**
    * If a results message already exists, remove it from the DOM.
    */
    function clearMessage() {
      if (document.querySelector('.results-message')) {
        const page = document.querySelector('.page');
        page.removeChild(document.querySelector('.results-message'));
      }
    }

    const searchResults = [];

    // Add items to searchResults that match search query
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
        searchResults.splice(i, 1);
      }
    }

    // Set display on all listItems to none
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].style.display = 'none';
    }

    if (searchResults.length) {
      clearMessage()
      showPage(searchResults, 1);
      createPaginationElement();
      appendPageLinks(searchResults);
    } else {
      clearMessage();
      // Remove pagination element
      document.querySelector('.page').removeChild(document.querySelector('.pagination'));
      createAndAppendElement(
        'p',
        [{property: 'textContent', value: 'No results found.'}, {property: 'className', value: 'results-message'}],
        '.page'
      );
    }
  }

  input.addEventListener('keyup', (e) => {
    showSearchResults();
  });

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    showSearchResults();
  });
}

function createPaginationElement() {
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

  ul.addEventListener('click', (e) => {
    const target = e.target;
    showPage(listItems, target.textContent);

    // Remove 'active' class from currently active link & append 'active' to target
    document.querySelector('.active').classList.remove('active');
    target.classList.add('active');
  });
}

createPaginationElement();
searchStudentList(listItems);
showPage(listItems, 1);
appendPageLinks(listItems);
