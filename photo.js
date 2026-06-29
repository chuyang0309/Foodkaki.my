$(document).ready(function() {
    const form = $('#uploadForm');
    const photoInput = $('#photoUpload');
    const videoInput = $('#videoUpload');
    const notification = $('#notification');
    const gallery = $('.gallery');
    const loading = $('#loading');
    
    // Persistent storage simulation using sessionStorage alternative
    let persistentStorage = {
        photos: [],
        videos: [],
        photoCount: 0,
        videoCount: 0
    };

    // Load existing data on page load
    loadPersistedData();

    // Hide notification initially
    notification.hide();

    videoInput.on('change', function() {
        const files = videoInput[0].files;
        notification.text(""); // Clear any previous messages
        checkVideosAndFilter(files);
    });

    form.on('submit', function(e) {
        e.preventDefault();
        handleFiles(photoInput[0].files, 'photo');
        handleFiles(videoInput[0].files, 'video');
        
        // Save data after upload
        saveDataToPersistentStorage();
        
        // Reset form
        form[0].reset();
    });

    function handleFiles(files, type) {
        if (files.length === 0) return;
        
        for (let file of files) {
            if (type === 'photo' && file.type.startsWith('image/')) {
                displayImage(file);
                persistentStorage.photoCount++;
            } else if (type === 'video' && file.type.startsWith('video/')) {
                displayVideo(file);
                persistentStorage.videoCount++;
            } else {
                notification.text('Please upload valid video/image files.').show();
            }
        }
        updateCounters();
    }

    function displayImage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = {
                src: e.target.result,
                name: file.name,
                type: 'photo',
                timestamp: Date.now()
            };
            
            // Store in persistent storage
            persistentStorage.photos.push(imageData);
            
            // Create and display image
            const img = $('<img>').attr('src', e.target.result)
                                  .addClass('photo uploaded-content')
                                  .attr('alt', 'Uploaded food image')
                                  .attr('data-type', 'uploaded');
            gallery.append(img);
        }
        reader.readAsDataURL(file);
    }

    function displayVideo(file) {
        const videoUrl = URL.createObjectURL(file);
        const videoData = {
            src: videoUrl,
            name: file.name,
            type: 'video',
            timestamp: Date.now()
        };
        
        // Store in persistent storage
        persistentStorage.videos.push(videoData);
        
        const video = $('<video>').attr('src', videoUrl)
                                 .attr('controls', true)
                                 .addClass('video uploaded-content')
                                 .attr('data-type', 'uploaded');
        gallery.append(video);
    }

    function saveDataToPersistentStorage() {
        try {
            // Using a global variable to persist data across page refreshes
            // In a real application, this would be saved to a server or localStorage
            window.foodKakiStorage = JSON.stringify(persistentStorage);
            
            // Also try to use sessionStorage if available (will fail in Claude artifacts)
            if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem('foodKakiData', JSON.stringify(persistentStorage));
            }
        } catch(e) {
            console.log('Storage not available, using in-memory storage');
        }
    }

    function loadPersistedData() {
        try {
            // Try to load from sessionStorage first
            let savedData = null;
            if (typeof(Storage) !== "undefined") {
                savedData = sessionStorage.getItem('foodKakiData');
            }
            
            // Fallback to global variable
            if (!savedData && window.foodKakiStorage) {
                savedData = window.foodKakiStorage;
            }
            
            if (savedData) {
                persistentStorage = JSON.parse(savedData);
                restoreUploadedContent();
            }
        } catch(e) {
            console.log('No previous data to load');
        }
        
        updateCounters();
    }

    function restoreUploadedContent() {
        // Clear existing uploaded content
        $('.gallery .uploaded-content').remove();
        
        // Restore photos
        persistentStorage.photos.forEach(photoData => {
            const img = $('<img>').attr('src', photoData.src)
                                  .addClass('photo uploaded-content')
                                  .attr('alt', 'Uploaded food image')
                                  .attr('data-type', 'uploaded');
            gallery.prepend(img); // Add to beginning so they appear first
        });
        
        // Restore videos
        persistentStorage.videos.forEach(videoData => {
            const video = $('<video>').attr('src', videoData.src)
                                     .attr('controls', true)
                                     .addClass('video uploaded-content')
                                     .attr('data-type', 'uploaded');
            gallery.prepend(video);
        });
    }

    function updateCounters() {
        $('.counter.photos .count').text(formatCount(persistentStorage.photoCount));
        $('.counter.videos .count').text(formatCount(persistentStorage.videoCount));
    }

    function formatCount(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count.toString();
    }

    function checkVideosAndFilter(files) {
        const dataTransfer = new DataTransfer();
        let totalFiles = files.length;
        let checkedFiles = 0;

        if (totalFiles === 0) return;

        notification.hide();

        for (let file of files) {
            let video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = function() {
                window.URL.revokeObjectURL(video.src);
                checkedFiles++;
                if (video.duration <= 30) {
                    dataTransfer.items.add(file);
                } else {
                    const message = `${file.name} exceeds 30 seconds and has been removed.`;
                    notification.text(message).show();
                }
                if (checkedFiles === totalFiles) {
                    videoInput[0].files = dataTransfer.files;
                }
            };
            video.onerror = function() {
                checkedFiles++;
                notification.text('Error checking video duration.').show();
                if (checkedFiles === totalFiles) {
                    videoInput[0].files = dataTransfer.files;
                }
            };
            video.src = URL.createObjectURL(file);
        }
    }

    // Replace with your Unsplash Access Key
    const UNSPLASH_ACCESS_KEY = 'yMaLe5e91pSXIgli5dvwv9qf581U6s0VWzDtg9QMdMo';

    $('#fetchImages').on('click', function() {
        fetchUnsplashImages();
    });

    function fetchUnsplashImages() {
        loading.show(); // Show loading
        // Clear existing Unsplash images but keep uploaded content
        $('.gallery img:not(.uploaded-content):not([src^="imagephoto/"])').remove();
        
        $.ajax({
            url: `https://api.unsplash.com/search/photos?query=malaysian+food&client_id=${UNSPLASH_ACCESS_KEY}&per_page=12`,
            type: 'GET',
            success: function(response) {
                response.results.forEach(photo => {
                    const img = $('<img>').attr('src', photo.urls.small)
                                         .addClass('photo')
                                         .attr('alt', 'Malaysian food image')
                                         .attr('data-type', 'unsplash');
                    gallery.append(img);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error:', textStatus, errorThrown);
                notification.text('Error loading images. Please try again.').show();
            },
            complete: function() {
                loading.hide(); // Hide loading after completion
            }
        });
    }

    // Enhanced filter buttons functionality
    $('.photos-btn').on('click', function() {
        $('.gallery .video').hide();
        $('.gallery .photo').show();
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
    });

    $('.videos-btn').on('click', function() {
        $('.gallery .photo').hide();
        $('.gallery .video').show();
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
    });

    $('.all-btn').on('click', function() {
        $('.gallery .photo').show();
        $('.gallery .video').show();
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
    });

    // Add clear storage button (for testing/debugging)
    function addClearButton() {
        if ($('#clearStorage').length === 0) {
            const clearBtn = $('<button id="clearStorage" style="background-color: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 20px; margin-left: 10px;">Clear All Uploads</button>');
            $('.filter-buttons').append(clearBtn);
            
            clearBtn.on('click', function() {
                if (confirm('Are you sure you want to clear all uploaded photos and videos?')) {
                    persistentStorage = {
                        photos: [],
                        videos: [],
                        photoCount: 0,
                        videoCount: 0
                    };
                    $('.gallery .uploaded-content').remove();
                    updateCounters();
                    saveDataToPersistentStorage();
                    notification.text('All uploads cleared.').show().delay(3000).fadeOut();
                }
            });
        }
    }
    
    // Add the clear button
    addClearButton();

    // Save data when page is about to unload
    $(window).on('beforeunload', function() {
        saveDataToPersistentStorage();
    });
});