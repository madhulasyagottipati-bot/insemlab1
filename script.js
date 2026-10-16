// Course Data
const courses = [
    {
        id: 1,
        title: "Complete Python Programming",
        category: "Programming",
        duration: "8 Weeks",
        price: 999,
        rating: 4.8,
        icon: "🐍",
        lessons: 45,
        level: "Beginner"
    },
    {
        id: 2,
        title: "Full Stack Web Development",
        category: "Programming",
        duration: "12 Weeks",
        price: 1499,
        rating: 4.9,
        icon: "💻",
        lessons: 60,
        level: "Intermediate"
    },
    {
        id: 3,
        title: "Java Programming Masterclass",
        category: "Programming",
        duration: "9 Weeks",
        price: 1199,
        rating: 4.7,
        icon: "☕",
        lessons: 50,
        level: "Beginner"
    },
    {
        id: 4,
        title: "UI/UX Design",
        category: "Design",
        duration: "6 Weeks",
        price: 799,
        rating: 4.7,
        icon: "🎨",
        lessons: 30,
        level: "Beginner"
    },
    {
        id: 5,
        title: "Graphic Design Essentials",
        category: "Design",
        duration: "4 Weeks",
        price: 599,
        rating: 4.6,
        icon: "🖌️",
        lessons: 25,
        level: "Beginner"
    },
    {
        id: 6,
        title: "Machine Learning",
        category: "Data Science",
        duration: "10 Weeks",
        price: 1999,
        rating: 4.9,
        icon: "🤖",
        lessons: 55,
        level: "Intermediate"
    },
    {
        id: 7,
        title: "Data Analytics with Python",
        category: "Data Science",
        duration: "8 Weeks",
        price: 1299,
        rating: 4.8,
        icon: "📊",
        lessons: 40,
        level: "Intermediate"
    },
    {
        id: 8,
        title: "Digital Marketing",
        category: "Business",
        duration: "5 Weeks",
        price: 699,
        rating: 4.5,
        icon: "📈",
        lessons: 28,
        level: "Beginner"
    },
    {
        id: 9,
        title: "Business Management",
        category: "Business",
        duration: "7 Weeks",
        price: 899,
        rating: 4.6,
        icon: "💼",
        lessons: 35,
        level: "Beginner"
    }
];

let selectedCategory = "All";

// Get Enrolled Courses from LocalStorage
function getEnrolledCourses() {
    try {
        const enrolled = JSON.parse(
            localStorage.getItem("learnhubCourses") || "[]"
        );

        return Array.isArray(enrolled) ? enrolled : [];
    } catch (error) {
        return [];
    }
}

// Display Course Cards
function displayCourses(courseList) {
    const container = document.getElementById("courseContainer");
    const noCourses = document.getElementById("noCourses");
    const enrolled = getEnrolledCourses();

    if (courseList.length === 0) {
        container.innerHTML = "";
        noCourses.hidden = false;
        return;
    }

    noCourses.hidden = true;

    container.innerHTML = courseList.map(course => {
        const isEnrolled = enrolled.some(
            item => item.id === course.id
        );

        return `
            <div class="course-card">

                <div class="course-image">
                    ${course.icon}
                </div>

                <div class="course-info">

                    <span class="course-category">
                        ${course.category}
                    </span>

                    <h3>${course.title}</h3>

                    <p>⏱ Duration: ${course.duration}</p>

                    <p>📚 Lessons: ${course.lessons}</p>

                    <p>🎯 Level: ${course.level}</p>

                    <p class="course-rating">
                        ⭐ ${course.rating}/5
                    </p>

                    <p class="course-price">
                        ₹${course.price}
                    </p>

                    <button
                        class="enroll-btn"
                        data-id="${course.id}"
                        ${isEnrolled ? "disabled" : ""}
                    >
                        ${isEnrolled ? "Already Enrolled" : "Enroll Now"}
                    </button>

                </div>
            </div>
        `;
    }).join("");
}

// Filter Courses by Category
function filterCourses(category) {
    selectedCategory = category;

    document.querySelectorAll(".category-btn").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === category
        );
    });

    searchCourses();
}

// Search Courses
function searchCourses() {
    const query = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    const filtered = courses.filter(course => {
        const matchesCategory =
            selectedCategory === "All" ||
            course.category === selectedCategory;

        const matchesSearch =
            course.title.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query) ||
            course.level.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    displayCourses(filtered);
}

// Enroll in a Course
function enrollCourse(id) {
    const course = courses.find(item => item.id === id);

    if (!course) {
        return;
    }

    const enrolled = getEnrolledCourses();

    if (enrolled.some(item => item.id === id)) {
        alert("You are already enrolled in this course!");
        return;
    }

    enrolled.push(course);

    localStorage.setItem(
        "learnhubCourses",
        JSON.stringify(enrolled)
    );

    alert("Successfully enrolled in " + course.title + "!");

    searchCourses();
    displayEnrolledCourses();
}

// Display Enrolled Courses
function displayEnrolledCourses() {
    const container = document.getElementById("enrolledCourses");
    const enrolled = getEnrolledCourses();

    if (enrolled.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                You haven't enrolled in any courses yet.
            </p>
        `;
        return;
    }

    container.innerHTML = enrolled.map(course => `
        <div class="enrolled-card">

            <h3>${course.icon} ${course.title}</h3>

            <p>Category: ${course.category}</p>

            <p>Duration: ${course.duration}</p>

            <p>Price: ₹${course.price}</p>

            <p>Lessons: ${course.lessons}</p>

            <p class="status">✓ Enrolled</p>

            <button
                class="remove-btn"
                data-id="${course.id}"
            >
                Remove Course
            </button>

        </div>
    `).join("");
}

// Remove an Enrolled Course
function removeCourse(id) {
    const enrolled = getEnrolledCourses().filter(
        course => course.id !== id
    );

    localStorage.setItem(
        "learnhubCourses",
        JSON.stringify(enrolled)
    );

    displayEnrolledCourses();
    searchCourses();
}

// Event Listeners
document.getElementById("searchButton").addEventListener(
    "click",
    searchCourses
);

document.getElementById("searchInput").addEventListener(
    "input",
    searchCourses
);

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        filterCourses(button.dataset.category);
    });
});

document.getElementById("courseContainer").addEventListener(
    "click",
    event => {
        const button = event.target.closest(".enroll-btn");

        if (button && !button.disabled) {
            enrollCourse(Number(button.dataset.id));
        }
    }
);

document.getElementById("enrolledCourses").addEventListener(
    "click",
    event => {
        const button = event.target.closest(".remove-btn");

        if (button) {
            removeCourse(Number(button.dataset.id));
        }
    }
);

// Initialize Website
displayCourses(courses);
displayEnrolledCourses();