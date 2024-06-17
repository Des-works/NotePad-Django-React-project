from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from . serializers import UserSerializers, NoteSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from . models import Note

# Create note view
# This view will be doing two things create note and list all of them
class NoteCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# Delete note
class NoteDeleteView(generics.DestroyAPIView):
    serializer_class = NoteSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    

# Create user view
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]
