// Group.js
export class Group {
  constructor(id, name, description, members, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.members = members;
    this.imageUrl = imageUrl;
  }

  addMember(member) {
    this.members.push(member);
  }
  removeMember(member) {
    this.members = this.members.filter((m) => m !== member);
  }
  getMembersCount() {
    return this.members.length;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      members: this.members,
      imageUrl: this.imageUrl,
    };
  }
}
