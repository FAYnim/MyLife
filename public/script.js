document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk menampilkan tanggal saat ini
    const displayCurrentDate = () => {
        const dateElement = document.getElementById('current-date');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options); // Bisa diganti 'id-ID' untuk bahasa Indonesia
    };

    displayCurrentDate();

    // Data contoh untuk habit
    const habits = [
        { id: 1, name: 'Read for 30 mins', icon: 'fas fa-book', color: 'reading', time: 'Morning', completed: false },
        { id: 2, name: 'Meditate (10 mins)', icon: 'fas fa-leaf', color: 'meditation', time: 'Morning', completed: true },
        { id: 3, name: 'Workout (30 mins)', icon: 'fas fa-dumbbell', color: 'workout', time: 'Afternoon', completed: false },
        { id: 4, name: 'Drink 2L Water', icon: 'fas fa-tint', color: 'water', time: 'All Day', completed: false },
        { id: 5, name: 'Journal (15 mins)', icon: 'fas fa-feather-alt', color: 'journal', time: 'Evening', completed: true },
    ];

    // Fungsi untuk merender daftar habit
    const renderHabits = () => {
        const habitList = document.querySelector('.habit-list');
        habitList.innerHTML = ''; // Bersihkan daftar sebelum merender ulang

        habits.forEach(habit => {
            const habitItem = document.createElement('div');
            habitItem.classList.add('habit-item');
            if (habit.completed) {
                habitItem.classList.add('completed');
            }

            habitItem.innerHTML = `
                <div class="habit-details">
                    <i class="icon ${habit.icon} ${habit.color}"></i>
                    <div>
                        <div class="habit-title">${habit.name}</div>
                        <div class="habit-meta">${habit.time}</div>
                    </div>
                </div>
                <input type="checkbox" class="habit-checkbox" ${habit.completed ? 'checked' : ''} data-id="${habit.id}">
            `;
            habitList.appendChild(habitItem);
        });

        // Tambahkan event listener ke checkbox
        document.querySelectorAll('.habit-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const habitId = parseInt(event.target.dataset.id);
                const habit = habits.find(h => h.id === habitId);
                if (habit) {
                    habit.completed = event.target.checked;
                    // Toggle class 'completed' pada parent habit-item
                    event.target.closest('.habit-item').classList.toggle('completed', habit.completed);
                    // Di sini Anda bisa menambahkan logika untuk update UI lain seperti overview cards
                    console.log(`Habit "${habit.name}" ${habit.completed ? 'completed' : 'uncompleted'}.`);
                }
            });
        });
    };

    renderHabits(); // Panggil fungsi untuk merender habit saat halaman dimuat

    // Toggle Sidebar untuk Mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainNav = document.querySelector('.main-nav');
    const userProfile = document.querySelector('.user-profile');

    // Menambahkan kelas untuk menunjukkan bahwa sidebar disembunyikan di mobile
    // Ini membantu CSS untuk mengontrol tampilannya
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile-hidden');
    }

    menuToggle.addEventListener('click', () => {
        // Toggle 'mobile-hidden' class
        sidebar.classList.toggle('mobile-hidden');
        mainNav.classList.toggle('mobile-active');
        userProfile.classList.toggle('mobile-active');
    });

    // Menyesuaikan tampilan saat resize window
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-hidden');
            mainNav.classList.remove('mobile-active');
            userProfile.classList.remove('mobile-active');
        } else {
            sidebar.classList.add('mobile-hidden');
            mainNav.classList.remove('mobile-active');
            userProfile.classList.remove('mobile-active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
  // Theme toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const icon = themeToggleBtn.querySelector('i');

  // Cek preferensi tema sebelumnya
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    // Simpan preferensi
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
