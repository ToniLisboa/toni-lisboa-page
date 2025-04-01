document.addEventListener('DOMContentLoaded', function() {
    // Animação do menu mobile (se necessário)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Scroll suave para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de revelação ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-anime]');
        const windowTop = window.scrollY + (window.innerHeight * 0.85);

        elements.forEach(element => {
            if(windowTop > element.offsetTop) {
                element.classList.add('animate');
            } else {
                element.classList.remove('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Dispara ao carregar

    // Animação do card de projetos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            card.style.transition = 'all 0.5s ease';
        });
    });

    // Contador de estatísticas (opcional)
    const stats = document.querySelectorAll('[data-stat]');
    if(stats) {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-stat');
            const count = { var: 0 };
            gsap.to(count, {
                var: target,
                duration: 2,
                onUpdate: () => {
                    stat.textContent = Math.ceil(count.var);
                }
            });
        });
    }

    // Barra de progresso do scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--primary-color);
        z-index: 9999;
        transition: width 0.3s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});