import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { User } from '@/app/types';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: NextRequest) {
    try {
      const { email, password } = await request.json() as { email: string; password: string };
  
      let users: User[] = [];
      try {
        const data = await fs.readFile(usersFile, 'utf8');
        users = JSON.parse(data);
      } catch (error) {
        users = [];
      }
  
      const user = users.find(u => u.email === email);
  
      if (user) {
        if (user.password === password) {
          return NextResponse.json({ message: 'Sign-in successful', userId: user.id }, { status: 200 });
        } else {
          return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
      } else {
        const newUser: User = { id: crypto.randomUUID(), email, password };
        users.push(newUser);
  
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  
        return NextResponse.json({ message: 'User created and signed in', userId: newUser.id }, { status: 201 });
      }
    } catch (error) {
      console.error('Error in signin:', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  