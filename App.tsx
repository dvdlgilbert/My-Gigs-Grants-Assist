
import React, { type FC } from 'react';
import type { NonprofitProfile, GrantProject, AppView } from './types.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import ProfileForm from './components/ProfileForm.tsx';
import GrantFinder from './components/GrantFinder.tsx';
import ProjectWorkspace from './components/ProjectWorkspace.tsx';
import { UserCircleIcon, FolderIcon, MagnifyingGlassIcon, PlusIcon } from './components/Icons.tsx';

const defaultProfile: NonprofitProfile = {
  orgName: '', mission: '', goals: '', needs: '', address: '', contactName: '', contactPhone: '', email: '', website: '', taxId: ''
};

const Header: FC = () => (
    <header className="bg-brand-dark shadow-md z-10">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">My Gigs - Grants Assist</h1>
            </div>
        </div>
    </header>
);

const Sidebar: FC<{ activeView: AppView, setView: (view: AppView) => void }> = ({ activeView, setView }) => {
    const navItems = [
        { id: 'DASHBOARD' as AppView, label: 'Grant Projects', icon: <FolderIcon className="h-5 w-5" /> },
        { id: 'FINDER' as AppView, label: 'Find Grants', icon: <MagnifyingGlassIcon className="h-5 w-5" /> },
        { id: 'PROFILE' as AppView, label: 'Nonprofit Profile', icon: <UserCircleIcon className="h-5 w-5" /> },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
                <h2 className="font-semibold text-lg text-slate-800">Menu</h2>
            </div>
            <nav className="flex-grow p-2">
                <ul>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button onClick={() => setView(item.id)} className={`flex items-center w-full text-left p-3 my-1 rounded-md text-sm font-medium transition-colors ${activeView === item.id ? 'bg-brand-secondary text-brand-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const Dashboard: FC<{
    projects: GrantProject[];
    onNewProject: () => void;
    onSelectProject: (id: string) => void;
    onDeleteProject: (id: string) => void;
}> = ({ projects, onNewProject, onSelectProject, onDeleteProject }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Grant Projects</h1>
                <button 
                    onClick={() => onNewProject()} 
                    className="inline-flex items-center gap-2 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Project
                </button>
            </div>
            {projects.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-lg">
                    <FolderIcon className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-2 text-sm font-semibold text-slate-900">No projects yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Get started by creating a new project.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(p => (
                        <div key={p.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-brand-dark truncate">{p.grantTitle}</h3>
                                <p className="text-sm text-slate-600 truncate">{p.funder}</p>
                                <p className="text-xs text-slate-400 mt-1">Last edited: {new Date(p.lastEdited).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === 'Awarded' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{p.status}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => onSelectProject(p.id)} className="text-sm font-medium text-brand-primary hover:text-brand-dark">Open</button>
                                    <button onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }} className="text-sm font-medium text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const App: FC = () => {
    const [profile, setProfile] = useLocalStorage<NonprofitProfile>('grant-assist-profile', defaultProfile);
    const [projects, setProjects] = useLocalStorage<GrantProject[]>('grant-assist-projects', []);
    const [view, setView] = React.useState<AppView>('DASHBOARD');
    const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

    const handleSaveProfile = (updatedProfile: NonprofitProfile) => {
        setProfile(updatedProfile);
    };

    const handleNewProject = (title?: string, funder?: string) => {
        // Fix: Ensure we don't accidentally use the event object as a title string
        const projectTitle = (typeof title === 'string' && title) ? title : "New Grant Project";
        const projectFunder = (typeof funder === 'string' && funder) ? funder : "Funder Name";

        const newProject: GrantProject = {
            id: crypto.randomUUID(),
            grantTitle: projectTitle,
            funder: projectFunder,
            status: 'Draft',
            proposal: '',
            lastEdited: new Date().toISOString(),
        };
        setProjects(prev => [newProject, ...prev]);
        setSelectedProjectId(newProject.id);
        setView('PROJECT');
    };

    const handleSelectProject = (id: string) => {
        setSelectedProjectId(id);
        setView('PROJECT');
    };
    
    const handleDeleteProject = (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSaveProject = (updatedProject: GrantProject) => {
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    const handleBackToDashboard = () => {
        setSelectedProjectId(null);
        setView('DASHBOARD');
    };

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    const renderContent = () => {
        switch (view) {
            case 'PROFILE':
                return <ProfileForm profile={profile} onSave={handleSaveProfile} onBack={() => setView('DASHBOARD')} />;
            case 'FINDER':
                return <GrantFinder profile={profile} onCreateProject={handleNewProject} />;
            case 'PROJECT':
                return selectedProject ? <ProjectWorkspace key={selectedProject.id} project={selectedProject} onSave={handleSaveProject} onBack={handleBackToDashboard} /> : <div className="p-8">Project not found.</div>;
            case 'DASHBOARD':
            default:
                return <Dashboard projects={projects} onNewProject={() => handleNewProject()} onSelectProject={handleSelectProject} onDeleteProject={handleDeleteProject} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <div className="flex-grow flex">
                <Sidebar activeView={view} setView={(v) => { setSelectedProjectId(null); setView(v); }} />
                <main className="flex-grow overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
