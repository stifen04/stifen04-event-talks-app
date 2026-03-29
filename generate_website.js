const fs = require('fs');

// --- 1. Placeholder Talk Data ---
const talksData = [
    {
        id: 'talk1',
        title: 'The Future of AI in Web Development',
        speakers: ['Dr. Alice Wonderland'],
        category: ['AI', 'Web', 'Frontend'],
        duration: 60, // minutes
        description: 'Explore how artificial intelligence is shaping the next generation of web applications, from intelligent UIs to automated content generation.'
    },
    {
        id: 'talk2',
        title: 'Scaling Node.js Microservices',
        speakers: ['Bob The Builder', 'Charlie Chaplin'],
        category: ['Backend', 'Node.js', 'Microservices'],
        duration: 60,
        description: 'Learn best practices and common pitfalls when building and scaling Node.js-based microservices in a cloud-native environment.'
    },
    {
        id: 'lunch',
        title: 'Lunch Break',
        speakers: [],
        category: ['Break'],
        duration: 60,
        description: 'Enjoy a delicious meal and network with fellow attendees.'
    },
    {
        id: 'talk3',
        title: 'Modern CSS for Responsive Layouts',
        speakers: ['Diana Prince'],
        category: ['CSS', 'Frontend', 'Design'],
        duration: 60,
        description: 'Dive into advanced CSS techniques like Grid, Flexbox, and custom properties to create stunning and responsive web interfaces.'
    },
    {
        id: 'talk4',
        title: 'Demystifying Blockchain Technology',
        speakers: ['Eve Adams'],
        category: ['Blockchain', 'Emerging Tech', 'Security'],
        duration: 60,
        description: 'An introductory session to understand the core concepts of blockchain, its applications, and its potential impact beyond cryptocurrencies.'
    },
    {
        id: 'talk5',
        title: 'Practical DevOps with Kubernetes',
        speakers: ['Frank Castle'],
        category: ['DevOps', 'Kubernetes', 'Cloud'],
        duration: 60,
        description: 'Hands-on session on deploying, managing, and scaling applications using Kubernetes in a DevOps workflow.'
    },
    {
        id: 'talk6',
        title: 'Data Visualization with D3.js',
        speakers: ['Grace Hopper'],
        category: ['Data Science', 'Frontend', 'JavaScript'],
        duration: 60,
        description: 'Master the art of creating interactive and compelling data visualizations using the powerful D3.js library.'
    }
];

// --- 2. Schedule Generation Logic ---
function calculateSchedule(talks) {
    let currentHour = 10;
    let currentMinute = 0;
    const scheduledItems = [];

    talks.forEach(item => {
        const startTime = new Date(2026, 2, 29, currentHour, currentMinute); // Year, Month (0-indexed), Day, Hour, Minute
        const endTime = new Date(startTime.getTime() + item.duration * 60 * 1000);

        scheduledItems.push({
            ...item,
            startTime: startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            endTime: endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        });

        currentHour = endTime.getHours();
        currentMinute = endTime.getMinutes();

        // Add transition time if it's a talk and not the last item
        if (item.id !== 'lunch' && item.id !== talks[talks.length - 1].id) {
            const transitionEndTime = new Date(endTime.getTime() + 10 * 60 * 1000); // 10 minutes transition
            currentHour = transitionEndTime.getHours();
            currentMinute = transitionEndTime.getMinutes();
        } else if (item.id === 'lunch') { // Add transition after lunch
             const transitionEndTime = new Date(endTime.getTime() + 10 * 60 * 1000); // 10 minutes transition after lunch
            currentHour = transitionEndTime.getHours();
            currentMinute = transitionEndTime.getMinutes();
        }
    });

    return scheduledItems;
}

const scheduledTalks = calculateSchedule(talksData);

// --- HTML Template and inlined CSS/JS ---
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Event Schedule</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f7f6;
            color: #333;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .container {
            max-width: 900px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-weight: 600;
        }

        .search-container {
            margin-bottom: 30px;
            text-align: center;
        }

        .search-container input[type="text"] {
            width: 70%;
            padding: 12px 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
            transition: border-color 0.3s ease;
        }

        .search-container input[type="text"]:focus {
            border-color: #007bff;
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }

        .talk-list {
            display: grid;
            gap: 25px;
        }

        .talk-item {
            background-color: #e9eff1;
            padding: 25px;
            border-radius: 8px;
            border-left: 5px solid #007bff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .talk-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .talk-item.lunch-break {
            border-left: 5px solid #ffc107; /* Orange for lunch */
            background-color: #fff3cd;
            color: #664d03;
            text-align: center;
            font-style: italic;
        }
        
        .talk-item.lunch-break:hover {
             transform: none;
             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .talk-time {
            font-size: 1.1em;
            font-weight: bold;
            color: #0056b3;
            margin-bottom: 10px;
        }
        
        .talk-item.lunch-break .talk-time {
            color: #664d03;
        }


        .talk-title {
            font-size: 1.5em;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .talk-speakers {
            font-style: italic;
            color: #555;
            margin-bottom: 10px;
        }

        .talk-category {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 15px;
        }
        
        .talk-category span {
            display: inline-block;
            background-color: #d1ecf1;
            color: #0c5460;
            padding: 4px 8px;
            border-radius: 4px;
            margin-right: 5px;
            margin-bottom: 5px;
            font-weight: 500;
        }

        .talk-description {
            font-size: 1em;
            color: #444;
        }

        @media (max-width: 768px) {
            .container {
                margin: 10px;
                padding: 20px;
            }
            .search-container input[type="text"] {
                width: 90%;
            }
            .talk-title {
                font-size: 1.3em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tech Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="categorySearch" placeholder="Search by category (e.g., AI, Backend)">
        </div>

        <div id="schedule" class="talk-list">
            <!-- Talks will be rendered here by JavaScript -->
        </div>
    </div>

    <script>
        const allTalks = ${JSON.stringify(scheduledTalks)};

        function renderSchedule(talksToRender) {
            const scheduleDiv = document.getElementById('schedule');
            scheduleDiv.innerHTML = ''; // Clear existing schedule

            talksToRender.forEach(talk => {
                const talkItem = document.createElement('div');
                talkItem.classList.add('talk-item');
                if (talk.id === 'lunch') {
                    talkItem.classList.add('lunch-break');
                }

                const speakersHtml = talk.speakers.length > 0
                    ? '<p class="talk-speakers">Speakers: ' + talk.speakers.join(', ') + '</p>'
                    : '';

                const categoryHtml = talk.category.length > 0
                    ? '<p class="talk-category">Categories: ' + talk.category.map(cat => '<span>' + cat + '</span>').join('') + '</p>'
                    : '';

                talkItem.innerHTML =
                    '<div class="talk-time">' + talk.startTime + ' - ' + talk.endTime + '</div>' +
                    '<h2 class="talk-title">' + talk.title + '</h2>' +
                    speakersHtml +
                    categoryHtml +
                    '<p class="talk-description">' + talk.description + '</p>';

                scheduleDiv.appendChild(talkItem);
            });
        }

        function filterTalks() {
            const searchTerm = document.getElementById('categorySearch').value.toLowerCase();
            const filtered = allTalks.filter(talk => {
                // Always show lunch break
                if (talk.id === 'lunch') return true;
                return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
            });
            renderSchedule(filtered);
        }

        // Initial render
        document.addEventListener('DOMContentLoaded', () => {
            renderSchedule(allTalks);
            document.getElementById('categorySearch').addEventListener('input', filterTalks);
        });
    </script>
</body>
</html>
