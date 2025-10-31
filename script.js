// DOM 元素
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-bar');
const scrollIndicator = document.querySelector('.scroll-indicator');

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 动画效果
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        
        // 显示菜单
        navMenu.style.display = 'flex';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(255, 255, 255, 0.98)';
        navMenu.style.padding = '2rem';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.borderTop = '1px solid var(--border-color)';
        navMenu.style.zIndex = '999';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // 隐藏菜单
        navMenu.style.display = 'none';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.background = 'none';
        navMenu.style.padding = '0';
        navMenu.style.backdropFilter = 'none';
        navMenu.style.borderTop = 'none';
    }
});

// 点击菜单项关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            navMenu.style.display = 'none';
            navMenu.style.position = 'static';
            navMenu.style.flexDirection = 'row';
            navMenu.style.background = 'none';
            navMenu.style.padding = '0';
            navMenu.style.backdropFilter = 'none';
            navMenu.style.borderTop = 'none';
        }
    });
});

// 窗口大小改变时重置菜单
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.background = 'none';
        navMenu.style.padding = '0';
        navMenu.style.backdropFilter = 'none';
        navMenu.style.borderTop = 'none';
        
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    } else {
        if (!hamburger.classList.contains('active')) {
            navMenu.style.display = 'none';
        }
    }
});

// 平滑滚动到目标区域
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // 减去导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 为所有内部链接添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});

// 导航栏活跃状态
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// 技能条动画
function animateSkillBars() {
    const skillsSection = document.querySelector('.skills');
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight;

    if (scrollPos > sectionTop + 100 && !skillsSection.classList.contains('animated')) {
        skillsSection.classList.add('animated');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            }, index * 200);
        });
    }
}

window.addEventListener('scroll', animateSkillBars);

// 滚动时元素淡入动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollTop + windowHeight > elementTop + elementHeight / 4) {
            element.classList.add('animate');
        }
    });
}

// 为需要动画的元素添加类
function initAnimations() {
    const elementsToAnimate = [
        '.about-text',
        '.profile-card',
        '.skill-category',
        '.project-card',
        '.timeline-item',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    initAnimations();
    animateOnScroll();
});

// 滚动指示器点击事件
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        smoothScrollTo('#about');
    });
}

// 表单提交处理
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // 简单的表单验证
        if (!name || !email || !subject || !message) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // 模拟发送邮件
        showNotification('消息发送成功！我会尽快回复您。', 'success');
        this.reset();
    });
}

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知函数
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease-out',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // 根据类型设置背景颜色
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 动画显示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// 添加粒子背景效果
function createParticleBackground() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.6';
    
    hero.appendChild(canvas);
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // 绘制连接线
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animate();
}

// 打字机效果
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    element.style.borderRight = '2px solid';
    element.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            element.style.borderRight = 'none';
            element.style.animation = 'none';
        }
    }, speed);
}

// 添加眨眼动画
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: white; }
    }
`;
document.head.appendChild(style);

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化动画
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && window.innerWidth > 768) {
            const originalText = heroTitle.textContent;
            typewriterEffect(heroTitle, originalText, 80);
        }
    }, 1000);
    
    // 创建粒子背景
    if (window.innerWidth > 768) {
        createParticleBackground();
    }
    
    // 添加悬停效果
    addHoverEffects();
});

// 悬停效果
function addHoverEffects() {
    // 为按钮添加波纹效果
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 为卡片添加倾斜效果
    document.querySelectorAll('.project-card, .skill-category').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// 添加波纹效果样式
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// 懒加载图片
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 防抖处理滚动事件
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    animateOnScroll();
    animateSkillBars();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// 添加回到顶部按钮
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    
    Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        zIndex: '1000'
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    document.body.appendChild(backToTop);
}

// 初始化回到顶部按钮
createBackToTopButton();

console.log('GitHub个人主页脚本加载完成！');