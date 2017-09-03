function toggle_caption() {
  var temp = document.querySelector('div.MetaViewer');
  if ((' ' + temp.className + ' ').indexOf(' on ') > -1) {
    temp.className = temp.className.replace(/\b on\b/,'');
    var temp = document.querySelector('div.ImageStage');
    temp.className = temp.className.replace(/\b meta-on caption\b/,'');
  } else {
    temp.className = temp.className + ' on';
    var temp = document.querySelector('div.ImageStage');
    temp.className = temp.className + ' meta-on caption';
  }
}

function insert_caption_toggle_after(element) {
  if (element.nextSibling.className != "caption") {
    var button = document.createElement("button");
    button.setAttribute("class", "caption");
    button.setAttribute("title", "Toggle caption");
    button.innerHTML = '<span>Toggle caption</span>';
    button.onclick = function() {
      toggle_caption();
    };
    element.parentNode.insertBefore(button, element.nextSibling);
  }
}

window.onload = function() {
  insertionQ('button.fullscreen').every(function(element){
      insert_caption_toggle_after(element);
  });
  var elem = document.querySelector('body.c1 div.Nav div');
  if (elem) {
    elem.innerHTML = elem.innerHTML + contactHtml;
  }
  // if (window.location.pathname.includes('/gallery/')) {
  //     thmOptSetPpg(500, window.location.pathname);
  //   }
  // var clientLink = document.querySelector(".Nav a[href='/p/clients']");
  // clientLink.addEventListener('click', initialize_client_grid, false);
  // if (window.location.pathname == "/p/clients") {
  //   initialize_client_grid();
  // }
}

var gridInitialized = false;
setInterval(function() {
  if (window.location.pathname == "/p/clients") {
    if (!gridInitialized) {
      gridInitialized = true;
      initialize_client_grid();
    }
  } else {
    gridInitialized = false;
  }
}, 50);

// http://isotope.metafizzy.co/filtering.html
function initialize_client_grid() {
  var elem = document.querySelector(".grid");
  var clientPage = document.querySelector("div#mode-p");
  if (elem && clientPage && clientPage.className == "stack-top") {
    var iso = new Isotope(elem, {
      itemSelector: '.item',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name'
      }
    });
    // bind filter button click
    var filtersElem = document.querySelector('.filters-button-group');
    filtersElem.addEventListener('click', function(event) {
      // only work with buttons
      if (!matchesSelector(event.target, 'button')) {
        return;
      }
      var filterValue = event.target.getAttribute('data-filter');
      // use matching filter function
      iso.arrange({filter: filterValue});
    });
    // change is-checked class on buttons
    var buttonGroups = document.querySelectorAll('.button-group');
    for (var i=0, len=buttonGroups.length; i < len; i++) {
      var buttonGroup = buttonGroups[i];
      radioButtonGroup(buttonGroup);
    }
    function radioButtonGroup(buttonGroup) {
      buttonGroup.addEventListener('click', function(event) {
        // only work with buttons
        if (!matchesSelector(event.target, 'button')) {
          return;
        }
        buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
        event.target.classList.add('is-checked');
      });
    }
  } else {
    setTimeout(initialize_client_grid, 50);
  }
}

var contactHtml = `
  <div data-global="" data-ordinal="3" class="widget Content">
    <div class="main">
      <div class="wContent">
        <form action="/search" method="get" id="search-form">
          <input type="text" size="15" name="I_DSC" placeholder="Search" id="search-input">
          <input type="hidden" name="I_DSC_AND" value="t">
          <input type="hidden" name="_ACT" value="search">
        </form>
        <div id="contact-label">
          contact
        </div>
        <div id="contact-info">
          Boulder, CO, USA
          <br>
          +1 (206) 853-3712
          <br>
          <a href="mailto:ethan.welty@gmail.com">ethan.welty@gmail.com</a>
        </div>
      </div>
    </div>
  </div>
  <div data-global="" data-ordinal="4" class="widget SocialFollow">
    <div class="follow-wrapper">
      <ul class="follow-options">
        <li>
          <a target="_blank" class="facebook" href="https://www.facebook.com/ethanweltyz"></a>
        </li>

        <li>
          <a target="_blank" class="linkedin" href="https://www.linkedin.com/in/ethanwelty"></a>
        </li>

        <li>
          <a target="_blank" class="googlePlus" href="https://plus.google.com/113628608426456917115"></a>
        </li>
      </ul>
    </div>
  </div>
`;
