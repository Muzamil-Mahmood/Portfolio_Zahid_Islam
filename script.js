document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll handler for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    function updateActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 120;

        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Scroll animations
    var animateElements = document.querySelectorAll('.animate-on-scroll');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // Stagger animation for grid items
    var grids = document.querySelectorAll('.courses-grid, .why-grid, .testimonials-grid');
    grids.forEach(function(grid) {
        var gridObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var children = entry.target.querySelectorAll('.animate-on-scroll');
                    children.forEach(function(child, index) {
                        setTimeout(function() {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        gridObserver.observe(grid);
    });

    // Contact form handling
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var formData = new FormData(contactForm);
            var name = formData.get('name');
            var email = formData.get('email');
            var whatsapp = formData.get('whatsapp');
            var age = formData.get('age');
            var time = formData.get('time');
            var message = formData.get('message');

            var subject = 'Quran Learning Inquiry from ' + name;
            var body = 'Assalamu Alaikum,\n\n';
            body += 'Name: ' + name + '\n';
            body += 'Email: ' + email + '\n';
            if (whatsapp) body += 'WhatsApp: ' + whatsapp + '\n';
            if (age) body += 'Student Age: ' + age + '\n';
            if (time) body += 'Preferred Time: ' + time + '\n';
            if (message) body += '\nMessage:\n' + message + '\n';
            body += '\nJazakAllahu Khairan';

            var mailtoLink = 'mailto:your.email@example.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.location.href = mailtoLink;

            alert('Thank you, ' + name + '! Your email client will open to send the inquiry.');
            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
