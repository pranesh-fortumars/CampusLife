-- Supabase Seed Data for CampusLife

INSERT INTO colleges (id, name, code, city, state, website)
VALUES 
('d1111111-1111-1111-1111-111111111111', 'Delhi Technological University (DTU)', 'DTU', 'New Delhi', 'Delhi', 'https://dtu.ac.in')
ON CONFLICT (code) DO NOTHING;

INSERT INTO profiles (
    id, email, full_name, avatar_url, college_id, roll_number, 
    degree, department, year_of_study, semester, section, 
    is_class_representative, bio, cgpa, sgpa, attendance_rate, role, privacy_mode
) VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'rahul.sharma@dtu.ac.in',
    'Rahul Sharma',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'd1111111-1111-1111-1111-111111111111',
    '219CS094',
    'B.Tech',
    'Computer Science & Engineering',
    3,
    6,
    'B',
    TRUE,
    'Passionate about full-stack dev, distributed systems & campus robotics. Class Representative (CR) for Section B.',
    8.64,
    8.78,
    81.40,
    'verified_student',
    'campus_guard'
) ON CONFLICT (id) DO NOTHING;

-- Enrolled Subjects
INSERT INTO subjects (id, user_id, code, name, credits, faculty_name, location, semester, is_elective)
VALUES
('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'CS-302', 'Database Management Systems', 4, 'Dr. Ananya Roy', 'CS Lab 304, Block B', 6, FALSE),
('b2222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', 'CS-304', 'Operating Systems', 4, 'Prof. K. Muralidhar', 'LH-102', 6, FALSE),
('b3333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', 'CS-306', 'Computer Networks', 3, 'Dr. R. Venkat', 'Room 204', 6, FALSE),
('b4444444-4444-4444-4444-444444444444', 'a1111111-1111-1111-1111-111111111111', 'CS-308', 'Software Engineering & Agile', 3, 'Prof. Neha Gupta', 'Hall 3', 6, FALSE),
('b5555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', 'CS-312', 'Machine Learning Elective', 4, 'Dr. Siddharth Sen', 'Lab 2', 6, TRUE)
ON CONFLICT (id) DO NOTHING;
