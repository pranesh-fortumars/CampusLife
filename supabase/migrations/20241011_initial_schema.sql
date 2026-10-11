-- Supabase Migration: Initial CampusLife Schema
-- Clean normalized relational schema with RLS

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Identity & Colleges
CREATE TABLE IF NOT EXISTS colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    website VARCHAR(255),
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- matches auth.users.id
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
    roll_number VARCHAR(50),
    degree VARCHAR(100) DEFAULT 'B.Tech',
    department VARCHAR(100) DEFAULT 'Computer Science & Engineering',
    year_of_study INT DEFAULT 3,
    semester INT DEFAULT 6,
    section VARCHAR(10) DEFAULT 'B',
    is_class_representative BOOLEAN DEFAULT FALSE,
    bio TEXT,
    phone VARCHAR(20),
    cgpa NUMERIC(4, 2) DEFAULT 8.64,
    sgpa NUMERIC(4, 2) DEFAULT 8.78,
    attendance_rate NUMERIC(5, 2) DEFAULT 81.40,
    role VARCHAR(50) DEFAULT 'verified_student', -- unverified, verified_student, club_organizer, college_admin, platform_admin
    privacy_mode VARCHAR(20) DEFAULT 'campus_guard', -- private, campus_guard, public
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Academics & Subjects
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    credits INT DEFAULT 4,
    faculty_name VARCHAR(150),
    department VARCHAR(100),
    location VARCHAR(100),
    semester INT DEFAULT 6,
    is_elective BOOLEAN DEFAULT FALSE,
    target_attendance_percentage NUMERIC(5,2) DEFAULT 75.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    session_time TIME,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'cancelled', 'late')),
    notes TEXT,
    entry_source VARCHAR(50) DEFAULT 'manual', -- manual, erp_sync, biometric
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timetable_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1: Monday, 7: Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(100),
    building VARCHAR(100),
    lecture_type VARCHAR(50) DEFAULT 'Theory', -- Theory, Lab, Tutorial
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
    attachment_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'academic' CHECK (category IN ('academic', 'personal', 'career', 'clubs')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date TIMESTAMP WITH TIME ZONE,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Community & Notices
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general', -- notice, technical, doubt, event, general
    is_official_notice BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    department_tag VARCHAR(100),
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Growth, Projects & Career
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    tagline TEXT,
    description TEXT,
    status VARCHAR(50) DEFAULT 'in_progress', -- deployed, in_progress, concept, completed
    tech_stack TEXT[] DEFAULT '{}',
    demo_url TEXT,
    repo_url TEXT,
    collaborators_count INT DEFAULT 1,
    progress_percentage INT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'technical',
    rating NUMERIC(3, 1) DEFAULT 4.0,
    proficiency_level VARCHAR(50) DEFAULT 'Proficient', -- Beginner, Intermediate, Proficient, Advanced
    endorsements_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    status VARCHAR(50) DEFAULT 'applied' CHECK (status IN ('saved', 'applied', 'online_assessment', 'interview_scheduled', 'offer', 'rejected')),
    deadline TIMESTAMP WITH TIME ZONE,
    interview_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timeline_memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(150),
    description TEXT,
    date_str VARCHAR(100) NOT NULL,
    semester_label VARCHAR(50) NOT NULL,
    badge_label VARCHAR(100),
    badge_type VARCHAR(50) DEFAULT 'default',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    expense_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

-- Basic user self-access RLS policies
CREATE POLICY "Users can view public or own profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users manage own subjects" ON subjects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own attendance" ON attendance_records FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own timetable" ON timetable_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own assignments" ON assignments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own tasks" ON tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own projects" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own skills" ON skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own applications" ON job_applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own timeline" ON timeline_memories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own expenses" ON expenses FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Posts viewable by college members" ON posts FOR SELECT USING (true);
CREATE POLICY "Posts creatable by authenticated" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
