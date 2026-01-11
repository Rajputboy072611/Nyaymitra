import React, { useState, useMemo } from 'react';
import { Search, Book, Scale, X, ChevronRight, Gavel } from 'lucide-react';

const LegalDictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState(null);

  // Comprehensive list of legal terms
  const terms = [
    { term: "Ab Initio", definition: "Latin for 'from the beginning'. Commonly used to indicate that a document, contract, or marriage was legally invalid from the start.", category: "Latin" },
    { term: "Acquittal", definition: "A jury verdict that a criminal defendant is not guilty, or the finding of a judge that the evidence is insufficient to support a conviction.", category: "Criminal Law" },
    { term: "Affidavit", definition: "A written or printed statement made under oath.", category: "Procedure" },
    { term: "Alibi", definition: "A claim or piece of evidence that one was elsewhere when an act, typically a criminal one, is alleged to have taken place.", category: "Criminal Law" },
    { term: "Amicus Curiae", definition: "Latin for 'friend of the court'. A person or group who is not a party to an action, but has a strong interest in the matter, will petition the court for permission to submit a brief in the action.", category: "Latin" },
    { term: "Appeal", definition: "A request made after a trial by a party that has lost on one or more issues that a higher court review the decision to determine if it was correct.", category: "Procedure" },
    { term: "Arbitration", definition: "A method of alternative dispute resolution where a dispute is submitted to one or more arbitrators who make a binding decision on the dispute.", category: "Dispute Resolution" },
    { term: "Bail", definition: "The release, prior to trial, of a person accused of a crime, under specified conditions designed to assure that person's appearance in court when required.", category: "Criminal Law" },
    { term: "Bench Trial", definition: "A trial without a jury, in which the judge serves as the fact-finder.", category: "Litigation" },
    { term: "Bona Fide", definition: "Latin for 'in good faith'. Signifies honesty, the 'real thing' and being without any intent to deceive.", category: "Latin" },
    { term: "Burden of Proof", definition: "The duty to prove disputed facts. In civil cases, a plaintiff generally has the burden of proving his or her case.", category: "Litigation" },
    { term: "Caveat Emptor", definition: "Latin for 'let the buyer beware'. The principle that the buyer alone is responsible for checking the quality and suitability of goods before a purchase is made.", category: "Commercial Law" },
    { term: "Certiorari", definition: "A writ issued by a superior court for the re-examination of an action of a lower court.", category: "Procedure" },
    { term: "Class Action", definition: "A lawsuit in which one or more members of a large group, or class, of individuals or other entities sue on behalf of the entire class.", category: "Litigation" },
    { term: "Damages", definition: "Money that a defendant pays a plaintiff in a civil case if the plaintiff has won. Damages may be compensatory (for loss or injury) or punitive (to punish and deter future misconduct).", category: "Civil Law" },
    { term: "De Facto", definition: "Latin for 'in fact' or 'actually'. Something that exists in practice but is not officially established by law.", category: "Latin" },
    { term: "De Jure", definition: "Latin for 'by right' or 'by law'. Something that exists legally and officially.", category: "Latin" },
    { term: "Deposition", definition: "An oral statement made before an officer authorized by law to administer oaths. Such statements are often taken to examine potential witnesses, to obtain discovery, or to be used later in trial.", category: "Procedure" },
    { term: "Discovery", definition: "The formal process of exchanging information between the parties about the witnesses and evidence they will present at trial.", category: "Procedure" },
    { term: "Double Jeopardy", definition: "The prohibition against a second prosecution of the same person for the same offense after the first trial has ended.", category: "Constitutional Law" },
    { term: "Ex Parte", definition: "A proceeding brought before a court by one party only, without notice to or challenge by the other side.", category: "Latin" },
    { term: "Force Majeure", definition: "A provision in a contract that frees both parties from obligation if an extraordinary event directly prevents one or both parties from performing.", category: "Contract Law" },
    { term: "Habeas Corpus", definition: "Latin for 'you have the body'. A judicial order forcing law enforcement authorities to produce a prisoner they are holding, and to justify the prisoner's continued confinement.", category: "Human Rights" },
    { term: "Indictment", definition: "The formal charge issued by a grand jury stating that there is enough evidence that the defendant committed the crime to justify having a trial.", category: "Criminal Law" },
    { term: "Injunction", definition: "A court order preventing one or more named parties from taking some action. A preliminary injunction often is issued to allow fact-finding, so a judge can determine whether a permanent injunction is justified.", category: "Civil Law" },
    { term: "Ipso Facto", definition: "Latin for 'by the fact itself'. By the very nature of the situation.", category: "Latin" },
    { term: "Jurisdiction", definition: "The legal authority of a court to hear and decide a certain type of case. It also is used as a synonym for venue, meaning the geographic area over which the court has territorial jurisdiction.", category: "Procedure" },
    { term: "Lien", definition: "A legal right or interest that a lender has in the debtor's property, lasting until a debt obligation that it secures is satisfied.", category: "Property Law" },
    { term: "Mens Rea", definition: "Latin for 'guilty mind'. The intention or knowledge of wrongdoing that constitutes part of a crime, as opposed to the action or conduct of the accused.", category: "Criminal Law" },
    { term: "Nolo Contendere", definition: "No contest. A plea of nolo contendere has the same effect as a plea of guilty, as far as the criminal sentence is concerned, but may not be considered as an admission of guilt for any other purpose.", category: "Criminal Law" },
    { term: "Plaintiff", definition: "A person or business that files a formal complaint with the court.", category: "Civil Law" },
    { term: "Power of Attorney", definition: "A legal document that authorizes another person to act on one's behalf.", category: "Estate Law" },
    { term: "Precedent", definition: "A court decision in an earlier case with facts and legal issues similar to a dispute currently before a court.", category: "Case Law" },
    { term: "Prima Facie", definition: "Latin for 'at first look' or 'on its face'. Refers to a fact that is presumed to be true unless contradicted by other evidence.", category: "Latin" },
    { term: "Pro Bono", definition: "Latin for 'for the public good'. Legal work performed by lawyers without pay to help people with legal problems and limited or no funds.", category: "Ethics" },
    { term: "Quid Pro Quo", definition: "Latin for 'something for something'. An exchange of goods or services, in which one transfer is contingent upon the other.", category: "Latin" },
    { term: "Reasonable Doubt", definition: "The standard of proof required in a criminal trial. It means that the evidence must be so conclusive that there is no reasonable doubt that the accused committed the crime.", category: "Criminal Law" },
    { term: "Stare Decisis", definition: "Latin for 'to stand by things decided'. The legal principle of determining points in litigation according to precedent.", category: "Latin" },
    { term: "Subpoena", definition: "A command, issued under a court's authority, to a witness to appear and give testimony.", category: "Procedure" },
    { term: "Summary Judgment", definition: "A decision made on the basis of statements and evidence without going to trial. It's used when there's no dispute as to the material facts of the case.", category: "Litigation" },
    { term: "Tort", definition: "A civil, not criminal, wrong. A negligent or intentional injury against a person or property, with the exception of breach of contract.", category: "Civil Law" },
    { term: "Voir Dire", definition: "Jury selection process of questioning prospective jurors, to ascertain their qualifications and determine any basis for challenge.", category: "Procedure" },
    { term: "Writ", definition: "A written court order directing a person to take, or refrain from taking, a certain act.", category: "Procedure" }
  ];

  // Filtering Logic
  const filteredTerms = useMemo(() => {
    return terms.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter === 'All' || item.term.charAt(0).toUpperCase() === selectedLetter;
      return matchesSearch && matchesLetter;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedLetter]);

  // Letters for navigation
  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-8 h-8 text-indigo-700" />
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-serif">Legal Lexicon</h1>
          </div>
          <p className="text-slate-500">A comprehensive dictionary of common legal terms and Latin maxims.</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 sticky top-4 z-10">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="Search for terms (e.g., 'Habeas Corpus', 'Tort')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 
                  ${selectedLetter === letter 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setSelectedTerm(item)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors font-serif">
                    {item.term}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {item.definition}
                </p>
                <div className="mt-3 flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read definition <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Book className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-lg">No terms found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedLetter('All');}}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm pb-8">
          <p>&copy; {new Date().getFullYear()} Legal Lexicon. All definitions are for educational purposes.</p>
        </div>

      </div>

      {/* Modal / Overlay for details */}
      {selectedTerm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedTerm(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedTerm(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                {selectedTerm.category}
              </span>
              <h2 className="text-4xl font-bold text-slate-900 font-serif mb-4">{selectedTerm.term}</h2>
              <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
            </div>
            
            <div className="prose prose-slate">
              <p className="text-lg text-slate-700 leading-relaxed">
                {selectedTerm.definition}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
               <button 
                  onClick={() => setSelectedTerm(null)}
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDictionary;
