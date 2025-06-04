/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Julia Alekseev
 *      Student ID: 051292134
 *      Date:       2023-07-20
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// Make a menu
const menu = document.getElementById("menu");

// Loop through the artists array
for (const artist of window.artists) {
  // Create a button element for each artist
  const button = document.createElement("button");
  button.textContent = artist.name;

  // Add a click event listener to each button
  button.addEventListener("click", () => {
    // Handle button click event here
    console.log("Button clicked for artist:", artist.name); //console log the name of the artist
    const artistId = artist.id;
    updateSongsTable(artistId);
  });

  // Append the button to the menu container
  menu.appendChild(button);
}

// Get references to the artist and song elements
const selectedArtistTitle = document.getElementById("selected-artist"); //artist element
const songsTableBody = document.getElementById("songs"); //song element

// Function to update the table with the selected artist's songs
function updateSongsTable(artistId) {
  // Find the selected artist based on the artistId
  const selectedArtist = artists.find((artist) => artist.id === artistId);

  if (selectedArtist) {
    // Update the selected artist title
    const artistLinks = selectedArtist.links
      .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
      .join(", ");
    selectedArtistTitle.innerHTML = `${selectedArtist.name} (${artistLinks})`;

    // Filter the songs array to get only the songs of the selected artist
    const selectedArtistSongs = songs.filter((song) => song.artistId === artistId && !song.flagged); // Filter songs that are not flagged

    // Clear the table body
    songsTableBody.innerHTML = "";

    // Create table row for header
    const headerRow = document.createElement("tr");

    // Create table cells for header
    const titleCell = document.createElement("th");
    titleCell.textContent = "Song Name";

    const yearCell = document.createElement("th");
    yearCell.textContent = "Song Year";

    const durationCell = document.createElement("th");
    durationCell.textContent = "Time";

    // Append the header cells to the row
    headerRow.appendChild(titleCell);
    headerRow.appendChild(yearCell);
    headerRow.appendChild(durationCell);

    // Append the header row to the table body
    songsTableBody.appendChild(headerRow);

    // Iterate over the selected artist's songs and create table rows
    selectedArtistSongs.forEach((song) => {
      // Calculate the duration in mm:ss format
      const minutes = Math.floor(song.duration / 60);
      const seconds = song.duration % 60;
      const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      // Create a table row
      const row = document.createElement("tr");

      // Create table cells for songs
      const nameCell = document.createElement("td");
      const nameLink = document.createElement("a");
      nameLink.href = song.links[0].url;
      nameLink.textContent = song.title;
      nameCell.appendChild(nameLink);

      const yearCell = document.createElement("td");
      yearCell.textContent = song.year;

      const durationCell = document.createElement("td");
      durationCell.textContent = duration;

      // Append the cells to the row
      row.appendChild(nameCell);
      row.appendChild(yearCell);
      row.appendChild(durationCell);

      // Append the row to the table body
      songsTableBody.appendChild(row);

      // Add event listener to the row
      row.addEventListener("click", () => {
        console.log("Row clicked for the song:", song.title);
      });
    });
  }
}

// Function to handle the click event on artist buttons
function clickMenu(event) {
  const artistId = event.target.getAttribute("data-artist-id");
  updateSongsTable(artistId);
}

// Add click event listeners to the artist buttons
const artistButtons = document.querySelectorAll("#menu button");
artistButtons.forEach((button) => {
  button.addEventListener("click", clickMenu);
});

// Initially update the songs table with the first artist's songs
updateSongsTable(artists[0].id);
