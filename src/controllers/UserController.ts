import { User } from "../models/User";

class UserController {
  private name: string = 't';
  private email: string = 't';
  private query: string = '';

  entrypoint(req: any) {
    const urlSearchParams = new URLSearchParams(req.url.split('?')[1]);
    this.name = urlSearchParams.get('name') || '';
    this.email = urlSearchParams.get('email') || '';
    this.query = urlSearchParams.get('query') || '';
    return this;
  }

  async save(req: any): Promise<Response> {
    console.time('Save time');
    const { name, email } = await req.json();
    const user = await new User({ name, email }).save();
    console.timeEnd('Save time');
    return new Response(
      JSON.stringify({ id: user.id, name: user.name, email: user.email }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  async findAll(): Promise<Response> {
    console.time('Find all time');

    const users = (await User.find()).map((user) => {
      return { id: user.id, name: user.name, email: user.email };
    });

    console.timeEnd('Find all time');
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async findBy(): Promise<Response> {
    console.time('Find by time');
    const users = (
      await User.find({
        ...JSON.parse(decodeURI(this.query)),
      })
    ).map((user) => {
      return { id: user.id, name: user.name, email: user.email };
    });
    console.timeEnd('Find by time');

    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async deleteById(req: any): Promise<Response> {
    console.time('Delete by time');
    const _id = req.url.split('/')[4];
    
    await User.deleteOne({ _id });
    
    console.timeEnd('Delete by time');
    return new Response(JSON.stringify({ status: 'DELETED' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async deleteAll(): Promise<Response> {
    console.time('deleteAll time');

    await User.deleteMany();
    
    console.timeEnd('deleteAll time');

    return new Response(JSON.stringify({ status: 'DELETED' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new UserController();
