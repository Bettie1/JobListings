//fetching data from json file
fetch("./data.json")
  .then((response) => response.json())
  .then((json) => showJobListings(json));

//itering through all job listings and appending then to the DOM
function showJobListings(jobListings) {
  const jobListingsContainer = document.getElementById("all-job-listings");

  jobListings.forEach((jobListing) => {
    const jobListingElement = createJobListingElement(jobListing);

    jobListingsContainer.appendChild(jobListingElement);
  });
}

//creating single job listing
function createJobListingElement(jobListing) {
  const jobListingElement = document.createElement("div");
  jobListingElement.classList.add("job-listing");

  const {
    company,
    new: isNew,
    featured: isFeatured,
    logo,
    position,
    postedAt,
    contract,
    location,
    role,
    level,
    languages,
    tools,
  } = jobListing;

  jobListingElement.innerHTML = `
  <img src="${logo}">
  <div class="JobListingInformation">
    <div class="nameAndFurtherInfo">
      <h4 class="company">${company}</h4>
      ${isNew ? '<div class="new">NEW!</div>' : ""}
      ${isFeatured ? '<div class="featured">FEATURED</div>' : ""}
    </div>
    <div class="roleName">
      <h3>${position}</h3>
    </div>
    <div class="positionDetails">
      <span class="details">${postedAt}</span>
      <span class="details">${contract}</span>
      <span class="details">${location}</span>
    </div>
    </div>
    <div class="postingCharacteristics">
    <span class="tag role">${role}</span>
      <span class="tag level">${level}</span>
      ${languages
        .map((language) => `<span class="tag language">${language}</span>`)

        .join("")}
      ${tools.map((tool) => `<span class="tag tool">${tool}</span>`).join("")}
    </div>
  `;

  const roleTags = jobListingElement.querySelectorAll(".role");
  const levelTags = jobListingElement.querySelectorAll(".level");
  const languageTags = jobListingElement.querySelectorAll(".language");
  const toolTags = jobListingElement.querySelectorAll(".tool");

  //adding and event-listener to the tags. after clicking on a certain tag it is being added to the filter div
  languageTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      addToInputContainer(tag.textContent, tag.classList);
    });
  });

  toolTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      addToInputContainer(tag.textContent, tag.classList);
    });
  });

  levelTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      addToInputContainer(tag.textContent, tag.classList);
    });
  });
  roleTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      addToInputContainer(tag.textContent, tag.classList);
    });
  });

  return jobListingElement;
}

//clearing the filter div after clicking on clear btn
const btnClear = document.getElementById("btn-clear");
btnClear.addEventListener("click", () => {
  const inputContainer = document.getElementById("input-container");
  inputContainer.innerHTML = "";
});

//adding a tag to the input container after clicking on it
function addToInputContainer(textContent, classList) {
  const inputContainer = document.getElementById("input-container");
  const tagElements = inputContainer.querySelectorAll(`.${classList[1]}`);
  //making sure, that only one tag of a kind is present in the filter div
  if (tagElements.length > 0) {
    tagElements.forEach((tag) => tag.remove());
  }

  // Add the new tag to the input container
  const tagElement = document.createElement("span");
  tagElement.textContent = textContent;
  tagElement.classList.add(...classList);
  inputContainer.appendChild(tagElement);

  filterJobListings();
}

//filtering the job listings depending on present tags in the filter div
function filterJobListings() {
  const inputContainer = document.getElementById("input-container");
  const selectedTags = Array.from(inputContainer.children).map((tag) =>
    tag.textContent.trim()
  );

  const jobListingsContainer = document.getElementById("all-job-listings");
  const jobListings = Array.from(jobListingsContainer.children);

  jobListings.forEach((jobListing) => {
    const jobTags = Array.from(jobListing.querySelectorAll(".tag")).map((tag) =>
      tag.textContent.trim()
    );
    if (selectedTags.every((tag) => jobTags.includes(tag))) {
      jobListing.style.display = "flex";
    } else {
      jobListing.style.display = "none";
    }
  });
}

// Adding an event listener to input container for filtering
const inputContainer = document.getElementById("input-container");
inputContainer.addEventListener("click", filterJobListings);
