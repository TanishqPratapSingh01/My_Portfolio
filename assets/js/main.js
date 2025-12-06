// =============================================================
// NAVBAR HAMBURGER MENU
// =============================================================
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("open");
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        const navLinks = document.querySelector(".nav-links");
        navLinks.classList.remove("open");
    });
});


// =============================================================
// SECTION FADE-IN ON SCROLL
// =============================================================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0px)";
            }
        });
    },
    { threshold: 0.18 }
);

sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "0.9s ease-out";
    observer.observe(sec);
});


// =============================================================
// PAGE LOADER
// =============================================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.transition = "0.6s";
        setTimeout(() => (loader.style.display = "none"), 600);
    }, 700);
});


// =============================================================
// CUSTOM CURSOR
// =============================================================
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

// Disable cursor on mobile
if (window.innerWidth < 768 && cursor) {
    cursor.style.display = "none";
}


// =============================================================
// PARALLAX HERO EFFECT
// =============================================================
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    let scrollValue = window.scrollY * 0.3;
    hero.style.backgroundPositionY = scrollValue + "px";
});


// =============================================================
// TYPEWRITER EFFECT
// =============================================================
const typewriterElement = document.getElementById("typewriterText");

if (typewriterElement) {
    const typewriterTexts = [
        "Frontend Developer",
        "Java DSA Enthusiast",
        "3rd Year BTech IT Student",
        "Creator of Futuristic UI Experiences"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = typewriterTexts[textIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1300);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
        }

        setTimeout(typeEffect, isDeleting ? 45 : 75);
    }

    typeEffect();
}


// =============================================================
// FETCH PROJECTS + BUILD GRID + MODAL
// =============================================================
let projectsData = [];

fetch("assets/data/projects.json")
    .then(res => res.json())
    .then(data => {
        projectsData = data;
        const container = document.querySelector(".project-grid");
        if (!container) return;

        data.forEach((project, index) => {
            const card = document.createElement("div");
            card.classList.add("project-card");
            card.dataset.index = index;

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.shortDescription}</p>
            `;

            card.addEventListener("click", () => openProjectModal(index));
            container.appendChild(card);
        });
    })
    .catch(err => console.error("Error loading projects:", err));


// =============================================================
// PROJECT MODAL
// =============================================================
const projectModal = document.getElementById("projectModal");
const closeProjectModalBtn = document.getElementById("closeProjectModal");

function openProjectModal(index) {
    const project = projectsData[index];

    document.getElementById("modalProjectTitle").textContent = project.title;
    document.getElementById("modalProjectDescription").textContent = project.fullDescription;

    // Tech stack badges
    const techBox = document.getElementById("modalTechStack");
    techBox.innerHTML = "";
    project.techStack.forEach(t => {
        const badge = document.createElement("span");
        badge.textContent = t;
        techBox.appendChild(badge);
    });

    // Live link
    const liveBtn = document.getElementById("modalLiveLink");
    liveBtn.href = project.liveUrl;

    projectModal.classList.add("active");
}

closeProjectModalBtn.addEventListener("click", () => {
    projectModal.classList.remove("active");
});

projectModal.addEventListener("click", e => {
    if (e.target === projectModal) {
        projectModal.classList.remove("active");
    }
});


// =============================================================
// RESUME MODAL
// =============================================================
const resumeModal = document.getElementById("resumeModal");
const openResumeBtn = document.getElementById("openResumeBtn");
const closeResumeModalBtn = document.getElementById("closeResumeModal");

if (openResumeBtn) {
    openResumeBtn.addEventListener("click", () => {
        resumeModal.classList.add("active");
    });
}

if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener("click", () => {
        resumeModal.classList.remove("active");
    });
}

resumeModal.addEventListener("click", e => {
    if (e.target === resumeModal) resumeModal.classList.remove("active");
});

// Disable right-click inside iframe
const resumeFrame = document.querySelector(".resume-frame");
if (resumeFrame) {
    resumeFrame.addEventListener("load", () => {
        resumeFrame.contentWindow.document.addEventListener("contextmenu", e => {
            e.preventDefault();
        });
    });
}


// =============================================================
// THREE.JS ORB BACKGROUND
// =============================================================
const canvas = document.getElementById("three-bg");

if (canvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4df3ff,
        wireframe: true,
        emissive: 0x4df3ff,
        emissiveIntensity: 0.5
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light = new THREE.PointLight(0x4df3ff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}


// =============================================================
// FOOTER YEAR
// =============================================================
document.getElementById("year").textContent = new Date().getFullYear();
