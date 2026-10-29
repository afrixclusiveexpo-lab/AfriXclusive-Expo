import type { DatabaseSync } from 'node:sqlite';
import { publicProjection, type PrivateProject } from '@i2v/domain';
import { transaction } from '@i2v/persistence';
const demoOwner = '00000000-0000-4000-8000-000000000001';
export function seedFictionalDiscovery(db: DatabaseSync): void {
  if (db.prepare('SELECT id FROM users WHERE id=?').get(demoOwner)) return;
  transaction(db, () => {
    // This actor has no usable password and cannot sign in. All its projects are labeled fictional.
    db.prepare('INSERT INTO users(id,email,name,password_hash) VALUES(?,?,?,?)').run(demoOwner, 'fictional-curator@example.invalid', 'Fictional project studio', '!disabled');
    const samples = [
      { title: 'Fieldnote', summary: 'A soil-sensing kit that helps smallholder growers choose when to irrigate. Built for repair, shared ownership, and places where connectivity comes and goes.', sector: 'Agriculture', stage: 'Pilot', location: 'Masvingo, Zimbabwe', needs: ['Field testing', 'Sensor partner'], institution: 'Fictional Midlands Innovation Studio', milestones: ['First working soil sensor', 'Offline field dashboard', 'Irrigation trial protocol', 'Second prototype enclosure'], dates: ['2026-07-15', '2026-08-10', '2026-09-22', '2026-10-10'] },
      { title: 'Second Current', summary: 'A modular battery health monitor for community solar systems. Making maintenance legible so useful equipment can stay in service for longer.', sector: 'Climate & energy', stage: 'Prototype', location: 'Bulawayo, Zimbabwe', needs: ['Electronics mentor', 'Test equipment'], institution: 'Fictional Open Workshop', milestones: ['Bench prototype assembled', 'Cycle-testing rig documented', 'Repair guide drafted'], dates: ['2026-08-04', '2026-09-13', '2026-10-16'] },
      { title: 'Signpost', summary: 'A visual learning toolkit co-designed around accessible classroom communication. A research-led exploration of better participation, with privacy at its core.', sector: 'Education', stage: 'Research', location: 'Harare, Zimbabwe', needs: ['Accessibility reviewer', 'Research collaborator'], institution: 'Fictional Learning Lab', milestones: ['Learning materials mapped', 'Interface study protocol'], dates: ['2026-09-01', '2026-10-14'] },
      { title: 'Reform Works', summary: 'A low-cost compression mould for turning sorted agricultural residue into packaging prototypes. Exploring materials that can be made and repaired locally.', sector: 'Industry', stage: 'Prototype', location: 'Mutare, Zimbabwe', needs: ['Materials testing', 'Fabrication partner'], institution: 'Fictional Circular Design Collective', milestones: ['Material samples catalogued', 'First mould built', 'Compression tests recorded', 'Revised press geometry', 'Packaging trial prepared'], dates: ['2026-06-20', '2026-07-10', '2026-08-12', '2026-09-09', '2026-10-18'] },
    ] as const;
    samples.forEach((sample, i) => {
      const id = `00000000-0000-4000-8000-${String(i + 10).padStart(12, '0')}`;
      const project: PrivateProject = { id, ownerId: demoOwner, title: sample.title, summary: sample.summary, sector: sample.sector, stage: sample.stage, location: sample.location, institution: sample.institution, needs: [...sample.needs], milestones: sample.milestones.map((title, n) => ({ id: `${id}-${n}`, title, date: sample.dates[n]!, evidence: 'self_reported' })), publishedAt: '2026-10-20T10:00:00.000Z', fictional: true, privateNotes: 'Fictional curator note — never in the public projection.', published: true };
      db.prepare('INSERT INTO projects(id,owner_id,data,public_data,published) VALUES(?,?,?,?,1)').run(id, demoOwner, JSON.stringify(project), JSON.stringify(publicProjection(project)));
    });
  });
}
