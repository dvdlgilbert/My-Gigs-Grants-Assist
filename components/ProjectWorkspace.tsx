import * as React from 'react';
import type { GrantProject } from '../types.ts';
import { getFormattingHelp } from '../services/geminiService.ts';
import { ArrowLeftIcon, LightBulbIcon } from './Icons.tsx';

interface ProjectWorkspaceProps {
  project: GrantProject;
  onSave: (project: GrantProject) => void;
  onBack: () => void;
}

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project, onSave, onBack }) => {
  const [title, setTitle] = React.useState(project.grantTitle);
  const [funder, setFunder] = React.useState(project.funder);
  const [proposal, setProposal] = React.useState(project.proposal);
  const [status, setStatus] = React.useState(project.status);
  const [aiHelp, setAiHelp] = React.useState('');
  const [isAiLoading, setIsAiLoading] = React.useState(false);
  
  React.useEffect(() => {
    // Sync state if project prop changes (e.g. switching projects)
    setTitle(project.grantTitle);
    setFunder(project.funder);
    setProposal(project.proposal);
    setStatus(project.status);
    setAiHelp('');
  }, [project.id]); // Only reset when ID changes to avoid loops

  React.useEffect(() => {
    const handler = setTimeout(() => {
      onSave({
        ...project,
        grantTitle: title,
        funder,
        proposal,
        status,
        lastEdited: new Date().toISOString(),
      });
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [title, funder, proposal, status, onSave, project.id]);

  const handleGetAiHelp = async () => {
    setIsAiLoading(true);
    setAiHelp('');
    try {
      const grantInfo = `Grant Title: ${title}\nFunder: ${funder}`;
      const helpText = await getFormattingHelp(proposal, grantInfo);
      setAiHelp(helpText);
    } catch (error) {
      setAiHelp('Sorry, there was an error getting assistance. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
       <button onClick={onBack} className="flex items-center gap-2 text-sm text-brand-primary font-semibold hover:underline mb-4">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Projects
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="grantTitle" className="block text-sm font-medium text-slate-600">Grant Title</label>
            <input type="text" id="grantTitle" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-lg font-semibold"/>
          </div>
          <div>
            <label htmlFor="funder" className="block text-sm font-medium text-slate-600">Funder</label>
            <input type="text" id="funder" value={funder} onChange={(e) => setFunder(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"/>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-600">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value as GrantProject['status'])} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary">
              <option>Draft</option>
              <option>Submitted</option>
              <option>Awarded</option>
              <option>Declined</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Proposal Draft</h2>
            <textarea
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Start writing your grant proposal here..."
                className="w-full h-[60vh] p-3 border border-slate-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary resize-none"
            />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">AI Writing Assistant</h2>
            <button onClick={handleGetAiHelp} disabled={isAiLoading || !proposal} className="flex items-center gap-2 py-2 px-4 text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark disabled:bg-slate-400">
                <LightBulbIcon className="w-4 h-4" />
                {isAiLoading ? 'Analyzing...' : 'Get Feedback'}
            </button>
          </div>
          <div className="w-full h-[60vh] p-3 border border-slate-200 bg-slate-50 rounded-md overflow-y-auto">
            {isAiLoading && <p className="text-slate-500">Generating feedback...</p>}
            {aiHelp ? <div className="prose prose-sm max-w-none" style={{ whiteSpace: 'pre-wrap' }}>{aiHelp}</div> : <p className="text-slate-500">Click "Get Feedback" to receive AI-powered suggestions on your proposal.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
